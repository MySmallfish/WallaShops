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

        function pathCategorySelected() {
            
            $scope.$root.$broadcast("WallaShops.CategorySelected", {
                category: $scope.selectedCategory
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



        //var products = [
        //    { id: 1, title: "א. 1", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 2, title: "ג. 2", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 3, title: "ב. 3", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 4, title: "מכונת 4", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 1, title: "א. 5", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 2, title: "ג. 6", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 3, title: "ב. 7", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 4, title: "מכונת 8", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 1, title: "א. 9", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 2, title: "ג. 10", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 3, title: "ב. 11", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 4, title: "מכונת 12", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 1, title: "א. 13", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 2, title: "ג. 14", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 3, title: "ב. 15", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
        //    { id: 4, title: "מכונת 16", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" }
        //];

        _.extend($scope, {
            isFilterValueNotEmpty: isFilterValueNotEmpty,
            clearSelectedFilterValues: clearSelectedFilterValues,
            pathCategorySelected: pathCategorySelected
        });

    }];



})(_, Simple, WallaShops);