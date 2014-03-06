(function (S, WS) {

    WS.ProductsListNavigationDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/products-list-navigation/products-list-navigation.html',
        scope:false,
        //scope: {
        //    step: "@",
        //    productsListLength: "@",
        //    navigationInfo: "="
        //},
        replace: true,
        controller: ["$scope", function ($scope) {

            var startIndex = 0;

            function calculatePage() {
                var pages = _.map(_.range($scope.productsListLength / step()), function (item) {
                    return { index: item, selected: isCurrent(item) };
                });
                return pages;
            }

            $scope.productsPage = [];

            function isCurrent(pointIndex) {
                return pointIndex == startIndex / $scope.step;
            };

            function canNavigateNext() {
                var result = false;
                if ($scope.productsListLength > 0 && startIndex + step() < $scope.productsListLength) {
                    result = true;
                }
                return result;
            }

            function canNavigateBack() {
                var result = false;
                if ($scope.productsListLength > 0 && startIndex > 0) {
                    result = true;
                }
                return result;
            }
            
            function step() {
                return parseInt($scope.step,10);
            }

            function updateProductPage() {
                if ($scope.productsListLength > 0) {
                    $scope.navigationInfo = {
                        startIndex: startIndex
                    };
                    $scope.points = calculatePage();
                }
            };

            $scope.canNavigateNext = canNavigateNext;
            $scope.canNavigateBack = canNavigateBack;

            $scope.navigateNext = function () {
                
                if (canNavigateNext()) {
                    startIndex += step();
                    $scope.movedToNext = true;
                    $scope.movedToPrevious = false;
                    updateProductPage();

                }
            };

            $scope.navigateBack = function () {
                if (canNavigateBack()) {
                    startIndex -= step();
                    $scope.movedToNext = false;
                    $scope.movedToPrevious = true;
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