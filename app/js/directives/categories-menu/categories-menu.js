(function(_, S, WS) {

    WS.CategoriesMenuDirective = [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/categories-menu.html',
            scope: {
                loadFilters: "&",
                loadCategories: "&"
            },
            replace: true,
            link: function(scope) {
                
            }
        };
    }];

})(_, Simple, WallaShops);