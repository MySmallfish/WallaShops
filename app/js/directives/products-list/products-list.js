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
            
            scope.$watch("category", function(category) {
                if (category && category.products && category.products.length) {
                    var newWidth = category.products.length * productPaneWidth;
                    $("div.products-list-content", element).width(newWidth);
                }
            });
        }
    };


})(Simple, WallaShops);