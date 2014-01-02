(function (S, WS) {

    WS.ProductsListNavigationDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/products-list-navigation/products-list-navigation.html',
        scope: false,
        controller: ["$scope", "$filter", function ($scope, $filter) {

            var startIndex = 0, step = 4;
            var productsCount = 14;

            $scope.productsPage = [];

            function canNavigateNext() {
                return startIndex + step < productsCount;
            }

            function canNavigateBack() {
                return startIndex > 0;
            }

            function updateProductPage() {
                var visibleProducts = $filter("skip")($scope.category.products, startIndex);
                $scope.category.currentProductsPage = $filter("limitTo")(visibleProducts, step);
            };

            $scope.canNavigateNext = canNavigateNext;
            $scope.canNavigateBack = canNavigateBack;

            $scope.navigateNext = function () {
                if (canNavigateNext()) {
                    updateProductPage();
                    startIndex += step;
                }
            };

            $scope.navigateBack = function () {
                if (canNavigateBack()) {
                    updateProductPage();
                    startIndex -= step;
                }
            };

            

            updateProductPage();

        }],
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...            

        }
    };

})(Simple, WallaShops);