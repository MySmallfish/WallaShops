(function(_, S, WS) {

    WS.CategoriesMenuDirective = [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/categories-menu.html',
            scope: {
                loadFilters: "&",
                loadCategories: "&",
                selectedCategory: "=",
                isCategories: "="
            },
            replace: true,
            link: function(scope) {
                scope.markFilterSelected = function() {
                    scope.$root.$broadcast("WallaShops.MenuTabSelected", { tab: "Filter" });
                };
                scope.markCategorySelected = function() {
                    scope.$root.$broadcast("WallaShops.MenuTabSelected", { tab: "Category" });
                };
                
            }
        };
    }];



})(_, Simple, WallaShops);