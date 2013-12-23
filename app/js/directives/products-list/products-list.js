(function (S, WS) {

    WS.ProductsListDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/products-list/products-list.html',
        scope: {
            category: "="
        },
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...            

        }
    };

})(Simple, WallaShops);