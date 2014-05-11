(function (S, WS) {

    WS.ProductsListItemsDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/products-list-items/products-list-items.html',
        scope: {
            products: "=",
            comparisonEnabled: "=",
            canCheck: "="
        },
        replace: true,
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...            
        }
    };

})(Simple, WallaShops);