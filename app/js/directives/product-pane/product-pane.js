(function (S, WS) {

    WS.ProductPaneDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/product-pane/product-pane.html',
        scope: {
            product: "="
        },
        replace: true,
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...            
            scope.stars = [0, 1, 2, 3, 4];
            scope.isDecimal = function(number) {
                return number > parseInt(number, 10);
            };
            scope.asInt = function (number) {
                return parseInt(number, 10);
            };
            
        }
    };

})(Simple, WallaShops);