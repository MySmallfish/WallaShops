(function (S, WS) {

    WS.ProductsListDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/products-list/products-list.html',
        scope: {
            category: "=",
            canCheck: "="
        },
        replace: true
    };


})(Simple, WallaShops);