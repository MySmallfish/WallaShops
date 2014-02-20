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
            $scope.$watch("category", function() {
                $scope.productsListLength = $scope.category.products.length;
            });
            function updateProductPage(navigationInfo) {
                if (navigationInfo && $scope.category.products) {
                    var visibleProducts = $filter("skip")($scope.category.products, navigationInfo.startIndex);
                    
                    $scope.currentProductsPage = $filter("limitTo")(visibleProducts, $scope.step);


                }
            };
            $scope.$watch("navigationInfo", function(newValue) {
                updateProductPage(newValue);
            });


        }],
        link: function(scope, element, attributes, ctrl) {
            // bind clicks...          
            
        }
    };

    //var visibleProducts = $filter("skip")($scope.category.products, startIndex);
    //$scope.category.currentProductsPage = $filter("limitTo")(visibleProducts, step);


})(Simple, WallaShops);