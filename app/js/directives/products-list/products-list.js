(function (S, WS) {

    WS.ProductsListDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/products-list/products-list.html',
        scope: {
            category: "=",
            canCheck: "="
        },
        replace: true,
        link: function (scope, element) {
            var productPaneWidth = 238;
            scope.$watch("category.products", function(categoryProducts) {
                if (categoryProducts) {
                    var newWidth = categoryProducts.length * productPaneWidth;
                    $("div.products-list", element).width(newWidth);
                    
                }
            });
        }
    };


})(Simple, WallaShops);