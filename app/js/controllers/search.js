(function (_, S, WS) {

    WS.SearchController = ["$timeout", "$q", "$scope", "$filter", "$location", "productService", "dailyCacheService", function ($timeout, $q, $scope, $filter, $location, productService, dailyCacheService) {
        $scope.hideNavigators = true;
        var storage = dailyCacheService.get("ComparisonProduct-Cache");

        function resetStorage() {
            if (!storage) {
                storage = {};
                dailyCacheService.store("ComparisonProduct-Cache", storage);
            }
        }

        resetStorage();

        $scope.navigationInfo = {};
        $scope.step = 4;
        $scope.maxSelection = 4;

        function openCamperisonPage() {
            $location.path("/Comparison");
        }

        function areProductsSelected() {
            var result = false;
            if ($scope.productsToCompare.length > 0) {
                result = true;
            }
            return result;
        }

        $scope.$watchCollection("productsToCompare", function (newValue) {

            if (dailyCacheService.get("productsToCompare")) {
                if (dailyCacheService.get("productsToCompare").length <= $scope.maxSelection) {
                    dailyCacheService.store("productsToCompare", $scope.productsToCompare);
                    //if (dailyCacheService.get("productsToCompare").length == $scope.maxSelection) {
                    //    openCamperisonPage();
                    //}

                }
            } else {
                dailyCacheService.store("productsToCompare", $scope.productsToCompare);
            }
        });

        function updateProductPage() {
            if ($scope.navigationInfo && $scope.productsLine1 && $scope.productsLine2) {
                //var visibleProducts1 = $filter("skip")($scope.productsLine1, $scope.navigationInfo.startIndex);
                var products1 = $scope.productsLine1; // $filter("limitTo")(visibleProducts1, $scope.step + 1);
                $scope.currentProductsPage1 = _.first(products1, 4);
                var products2 = $scope.productsLine2; //$filter("limitTo")(visibleProducts2, $scope.step + 1);
                $scope.currentProductsPage2 = _.first(products2, 4);
                $timeout(function () {
                    $scope.loadImages(products1);
                    $scope.loadImages(products2);

                    $scope.currentProductsPage2 = products2;
                    $scope.currentProductsPage1 = products1;
                }, 250);
            }
        };

        $scope.$watch("navigationInfo", function (newValue) {
            $scope.navigationInfo = newValue;

            updateProductPage();
        });

        function isFilterValueNotEmpty(filterValue) {
            return filterValue;
        }

        function buildSearchParameters(routeParameters) {
            var productParameters = {
            };

            if (routeParameters.searchTerm) {
                $scope.searchText = productParameters.searchTerm = routeParameters.searchTerm;
            } else {
                if (routeParameters.subCategoryId >= 0) {
                    if (routeParameters.parent && routeParameters.parent.subCategoryId >= 0) {
                        productParameters.subSubCategoryId = routeParameters.subCategoryId;
                    } else {
                        productParameters.subCategoryId = routeParameters.subCategoryId;
                    }
                } else {
                    productParameters.mainCategoryId = routeParameters.mainCategoryId;
                }

                if ($scope.selectedFilterValues) {
                    productParameters.filters = _.map(_.filter($scope.selectedFilterValues.values, function (filter) {
                        return filter.value;
                    }), function (filter) {
                        return filter.value.id;
                    });
                }
            }
            return productParameters;
        }

        function fetch(productParameters) {
            var category = $scope.currentCategory;
            
            var products = productService.search(productParameters);
            
            return products.then(function (items) {
                return { category: category, items: items };
            });
        }

        function resetNavigation(context) {
            $scope.navigationInfo = { startIndex: 0 };
            return context;
        }

        function load(items) {
            var products = _.first(items.items, 16);
            if (products && products.length) {
                $scope.productsLine1 = _.filter(products, function (product, index) { return index % 2 == 0; });
                $scope.productsLine2 = _.filter(products, function (product, index) { return index % 2 != 0; });
                $scope.productsListLength = $scope.productsLine1.length;
            } else {
                $scope.productsLine1 = [];
                $scope.productsLine2 = [];
                $scope.productsListLength = 0;
            }

            return products;
        }


        function extractCategoryParameters() {

            var routeParameters = {
                searchTerm: $scope.searchTerm
            };

            var category = $scope.currentCategory;
            if (category) {
                routeParameters = _.extend(routeParameters, {
                    categoryId: category.id,
                    categoryName:
                    category.title,
                    level:
                    category.level,
                    mainCategoryId:
                    category.mainCategoryId,
                    subCategoryId:
                    category.subCategoryId,
                    parent:
                    category.parent
                });
            }
            return routeParameters;
        }

        $scope.$on("WallaShops.Search", function() {
            $scope.clear(true);
            refresh();
        });
        $scope.$watch("currentCategory", function () {
            cancelInitial = true;

            refresh();
        });
        $scope.$watch("selectedFilterValues", refresh);


        function displayError(error) {
            $scope.fatalError = error;
        }
        function refresh() {
            $scope.notifyProgress()
                .then(extractCategoryParameters)
                .then(buildSearchParameters)
                .then(fetch)
                .then(load)
                .then(resetNavigation)
                .catch(displayError)
                .finally($scope.stopProgress);

        }

        function clearSelectedFilterValues() {
            $scope.$root.$broadcast("WallaShops.clearSelectedFilterValues");
        }


        function isCheckedToCompare(product) {
            var result = false;
            if (_.find($scope.productsToCompare, function (theProduct) { return product.id == theProduct.id; })) {
                result = true;
            }
            return result;
        }

        function find(categories, id) {
            var category = _.find(categories, function (item) {
                return item.id == id;
            });

            if (!category) {
                for (var i = 0; i < categories.length; i++) {
                    var found = find(categories[i].categories, id);
                    if (found) {
                        category = found;
                        break;
                    }
                }
            }

            return category;
        }

        function selectCategoryById(categoryId) {


            var categories = dailyCacheService.get("menuCategories");

            if (categories) {

                var category = find(categories, categoryId);

                if (category) {
                    $scope.$parent.currentCategory = category;
                }
            }

            refresh();
        }

        var cancelInitial = false;
        $timeout(function () {
            if (!cancelInitial) {
                refresh();
            } else {
                cancelInitial = true;
            }
        }, 300);


        _.extend($scope, {
            isFilterValueNotEmpty: isFilterValueNotEmpty,
            clearSelectedFilterValues: clearSelectedFilterValues,
            selectCategoryById: selectCategoryById,
            areProductsSelected: areProductsSelected,
            openCamperisonPage: openCamperisonPage,
            isCheckedToCompare: isCheckedToCompare
        });

    }];



})(_, Simple, WallaShops);