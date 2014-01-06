(function (S, WS) {

    WS.ProductsListNavigationDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/products-list-navigation/products-list-navigation.html',
        scope: false,
        replace: true,
        controller: ["$scope", "$filter", function ($scope, $filter) {

            var startIndex = 0, step = 4;
            var productsCount = 20;

            $scope.productsPage = [];

            function canNavigateNext() {
                var result = startIndex + step < productsCount;
                console.log("canNavigateNext " + result);
                return result;
            }

            function canNavigateBack() {
                var result = startIndex > 0;
                console.log("canNavigateBack " + result);
                return result;
            }

            function updateProductPage() {
                console.log("updateProductPage");
                var visibleProducts = $filter("skip")($scope.category.products, startIndex);
                $scope.category.currentProductsPage = $filter("limitTo")(visibleProducts, step);
            };

            $scope.canNavigateNext = canNavigateNext;
            $scope.canNavigateBack = canNavigateBack;

            $scope.navigateNext = function () {
                console.log("navigateNext");
                if (canNavigateNext()) {
                    startIndex += step;
                    console.log(startIndex);
                    updateProductPage();
                    
                }
            };

            $scope.navigateBack = function () {
                console.log("navigateBack");
                if (canNavigateBack()) {
                    startIndex -= step;
                    console.log(startIndex);
                    updateProductPage();
                    
                }
            };

            

            updateProductPage();

        }],
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...            

        }
    };

})(Simple, WallaShops);