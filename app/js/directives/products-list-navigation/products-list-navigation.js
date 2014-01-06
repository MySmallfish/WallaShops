(function (S, WS) {

    WS.ProductsListNavigationDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/products-list-navigation/products-list-navigation.html',
        scope: false,
        replace: true,
        controller: ["$scope", "$filter", function ($scope, $filter) {

            var startIndex = 0, step = 4;
            function productsCount() {
                return $scope.category.products.length;
            };
            
            function calculatePage() {
                var pages = _.map(_.range(productsCount() / step), function (item) {
                    return { index: item, selected: isCurrent(item) };
                });
                return pages;
            }

            $scope.productsPage = [];

            function isCurrent(pointIndex) {
                return pointIndex == startIndex / step ;
            };

            function canNavigateNext() {
                var result = false;
                if ($scope.category.products) {
                    result = startIndex + step < productsCount();
                }
                return result;
            }


            function canNavigateBack() {
                var result = false;
                if ($scope.category.products) {
                    result = startIndex > 0;
                }
                return result;
            }



            function updateProductPage() {
                if ($scope.category.products) {
                    var visibleProducts = $filter("skip")($scope.category.products, startIndex);
                    $scope.category.currentProductsPage = $filter("limitTo")(visibleProducts, step);
                    $scope.points = calculatePage();
                }
            };

            $scope.canNavigateNext = canNavigateNext;
            $scope.canNavigateBack = canNavigateBack;

            $scope.navigateNext = function () {
                if (canNavigateNext()) {
                    startIndex += step;
                    console.log(startIndex);
                    updateProductPage();

                }
            };

            $scope.navigateBack = function () {
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