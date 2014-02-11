(function (_, S, WS) {

    WS.SearchController = ["$q", "$scope", "$filter", "productService", "$routeParams", function ($q, $scope, $filter, productService, $routeParams) {

        $scope.step = 4;

        function updateProductPage(navigationInfo) {
            if (navigationInfo && $scope.productsLine1) {
                var visibleProducts1 = $filter("skip")($scope.productsLine1, navigationInfo.startIndex);
                $scope.currentProductsPage1 = $filter("limitTo")(visibleProducts1, $scope.step);
            }
            if (navigationInfo && $scope.productsLine2) {
                var visibleProducts2 = $filter("skip")($scope.productsLine2, navigationInfo.startIndex);
                $scope.currentProductsPage2 = $filter("limitTo")(visibleProducts2, $scope.step);
            }
        };

        $scope.$watch("navigationInfo", function (newValue) {
            updateProductPage(newValue);
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
            $scope.fullPath = routeParameters.path;

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
            }
            return products;
        }

        function notifyProgress(context) {
            console.log("P-S");
            return $q.when(context);
        }

        function stopProgress() {
            console.log("P-E");
        }

        function refresh() {
            notifyProgress($routeParams)
                .then(buildSearchParameters)
                .then(fetch)
                .then(load)
                .then(resetNavigation)
                .finally(stopProgress);
        }
        
        function clearSelectedFilterValues() {
            $scope.$root.selectedFilterValues = null;
            $scope.$root.$broadcast("WallaShops.clearSelectedFilterValues");
            
        }
        
        refresh();

        _.extend($scope, {
            isFilterValueNotEmpty: isFilterValueNotEmpty,
            clearSelectedFilterValues: clearSelectedFilterValues,
            selectCategoryByPath: selectCategoryByPath
        });

    }];



})(_, Simple, WallaShops);