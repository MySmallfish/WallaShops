(function (_, S, WS) {

    WS.SearchController = ["$q", "$scope", "$filter", "$location", "productService", "dailyCacheService", "$routeParams", function ($q, $scope, $filter, $location, productService, dailyCacheService, $routeParams) {
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

        function isAnyProductSelected() {
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
                    if (dailyCacheService.get("productsToCompare").length == 0) {
                        $scope.$parent.selectionMode = false;
                    }

                    if (dailyCacheService.get("productsToCompare").length == $scope.maxSelection) {
                        openCamperisonPage();
                    }
                    
                }
            } else {
                dailyCacheService.store("productsToCompare", $scope.productsToCompare);
            }
        });

        function toggleComparison() {
            $scope.$parent.selectionMode = !$scope.$parent.selectionMode;
        }

        function updateProductPage() {
            if ($scope.navigationInfo && $scope.productsLine1) {
                var visibleProducts1 = $filter("skip")($scope.productsLine1, $scope.navigationInfo.startIndex);
                $scope.currentProductsPage1 = $filter("limitTo")(visibleProducts1, $scope.step);
            }
            if ($scope.navigationInfo && $scope.productsLine2) {
                var visibleProducts2 = $filter("skip")($scope.productsLine2, $scope.navigationInfo.startIndex);
                $scope.currentProductsPage2 = $filter("limitTo")(visibleProducts2, $scope.step);
            }
        };

        $scope.$watch("navigationInfo", function (newValue) {
            $scope.navigationInfo = newValue;
            updateProductPage();
        });
        
        //$scope.$watch("searchTerm", function () {
        //    console.log("$watch", $scope.searchTerm);
        //    refresh();
        //});

        function selectCategoryByPath(category) {
            $scope.$root.$broadcast("WallaShops.SelectCategoryRequested", {
                category: category
            });
        }

        function isFilterValueNotEmpty(filterValue) {
            return filterValue;
        }

        function buildSearchParameters(routeParameters) {
            var productParameters = {
            };
            if (routeParameters.searchTerm) {
                productParameters.searchTerm = routeParameters.searchTerm;
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
            }
            return productParameters;
        }

        function fetch(productParameters) {
            var products = productService.search(productParameters);

            return products;
        }

        function resetNavigation(context) {
            $scope.navigationInfo = { startIndex: 0 };
            return context;
        }

        function load(products) {
            if (products && products.length) {
                $scope.productsLine1 = _.filter(products, function (product, index) { return index % 2 == 0; });
                $scope.productsLine2 = _.filter(products, function (product, index) { return index % 2 != 0; });
                $scope.productsListLength = $scope.productsLine1.length;
            }
            return products;
        }

        function notifyProgress(context) {
            return $q.when(context);
        }

        function extractCategoryParameters() {
            var category = $scope.currentCategory;
            var routeParameters = {
                categoryId: category.id,
                categoryName: category.title,
                level: category.level,
                mainCategoryId: category.mainCategoryId,
                subCategoryId: category.subCategoryId,
                parent: category.parent
            };
            return routeParameters;
        }


        function refresh() {
            notifyProgress()
                .then(extractCategoryParameters)
                .then(buildSearchParameters)
                .then(fetch)
                .then(load)
                .then(resetNavigation);
                
        }

        function clearSelectedFilterValues() {
            $scope.$root.selectedFilterValues = null;
            $scope.$root.$broadcast("WallaShops.clearSelectedFilterValues");

        }
        
        function isCheckedToCompare(product) {
            var result = false;
            if(_.find($scope.productsToCompare, function (theProduct) { return product.id == theProduct.id; })) {
                result = true;
            }
            return result;
        }

        refresh();
        

        _.extend($scope, {
            isFilterValueNotEmpty: isFilterValueNotEmpty,
            clearSelectedFilterValues: clearSelectedFilterValues,
            selectCategoryByPath: selectCategoryByPath,
            toggleComparison: toggleComparison,
            isAnyProductSelected: isAnyProductSelected,
            openCamperisonPage: openCamperisonPage,
            isCheckedToCompare: isCheckedToCompare
        });

    }];



})(_, Simple, WallaShops);