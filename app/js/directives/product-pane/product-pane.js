(function (S, WS) {

    WS.ProductPaneDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/product-pane/product-pane.html',
        scope: {
            product: "="
        },
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...            
            
        }
    };

})(Simple, WallaShops);