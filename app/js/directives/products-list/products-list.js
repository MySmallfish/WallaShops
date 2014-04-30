(function (S, WS) {

    WS.ProductsListDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/products-list/products-list.html',
        scope: {
            showProduct: "&",
            category: "="
        },
        replace: true,
        controller: ["$scope", "$filter", function ($scope, $filter) {
            $scope.step = 4;
            $scope.navigationInfo = {};
            $scope.points = [];
            
            $scope.$watch("category", function () {
                if ($scope.category) {
                    $scope.productsListLength = $scope.category.products.length;
                }
            });
            
            function updateProductPage(navigationInfo) {
                if ($scope.category) {
                    $scope.currentProductsPage = $scope.category.products;
                    $scope.productsListLength = $scope.category.products.length;
                }
            };
            $scope.$watch("navigationInfo", function (newValue) {
                updateProductPage(newValue);
            });

            updateProductPage({});
        }],
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...          

        }
    };


})(Simple, WallaShops);