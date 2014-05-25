(function (_, S, WS) {

    WS.SearchController = ["$timeout", "$q", "$scope", "$filter", "$location", "productService", "dailyCacheService", "safeApply", function ($timeout, $q, $scope, $filter, $location, productService, dailyCacheService, safeApply) {
        var storage = dailyCacheService.get("ComparisonProduct-Cache");

        function resetStorage() {
            if (!storage) {
                storage = {};
                dailyCacheService.store("ComparisonProduct-Cache", storage);
            }
        }

        resetStorage();

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
                }
            } else {
                dailyCacheService.store("productsToCompare", $scope.productsToCompare);
            }
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

        var transactionId = 0;
        function fetch(productParameters) {
            transactionId++;
            productParameters.transactionId = transactionId;
            var category = $scope.currentCategory;

            var products = productService.search(productParameters);

            return products.then(function (results) {
                return { category: category, items: results.items, parameters: results.parameters, transactionId: results.parameters.transactionId };
            });
        }

        var iterator = function (a, n) {
            var current = 0,
                l = a.length;
            return function () {
                end = current + n;
                var part = a.slice(current, end);
                current = end < l ? end : 0;
                return part;
            };
        };
        var next;
        $scope.currentProductsPages = [];
        var pageSize = 12;
        var stopLoading, loadTimeout;
        
        function shouldStop(tId) {
            
            if (stopLoading || tId !== transactionId) {
                stopLoading = false;
                if (loadTimeout) {
                    clearTimeout(loadTimeout);
                }
                safeApply($scope);
                return true;
            }

        }

        function load(items) {
            
            if (shouldStop(items.transactionId)) {
                return;
            }
            var products = items.items;
            if (products && products.length) {
                next = iterator(products, pageSize);
                $scope.firstProductPage = next();
                var page = next();
                function loadPage() {
                    if (shouldStop(items.transactionId)) {
                       return;
                    }
                    if (page.length == pageSize) {
                        $scope.currentProductsPages.push(page);
                        requestAnimationFrame(function() { safeApply($scope); });
                        page = next();
                        
                        loadTimeout = setTimeout(loadPage, 320);
                    } else {
                        if (page.length > 0) {
                            $scope.currentProductsPages.push(page);
                            safeApply($scope);
                        }
                    }
                }
                $timeout(loadPage, 100);
            } else {
                $scope.firstProductPage = [];
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
                    categoryName: category.title,
                    level: category.level,
                    mainCategoryId: category.mainCategoryId,
                    subCategoryId:category.subCategoryId,
                    parent: category.parent
                });
            }
            return routeParameters;
        }

        $scope.$on("WallaShops.Search", function () {
            $scope.clear(true);
            refresh();
        });
        $scope.$watch("currentCategory", refresh);
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

        refresh();

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