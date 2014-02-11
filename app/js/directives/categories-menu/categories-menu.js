(function(_, S, WS) {

    WS.CategoriesMenuDirective = [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/categories-menu.html',
            scope: {
                loadFilters: "&",
                loadCategories: "&",
                selectedCategory: "="
            },
            replace: true,
            controller: ["$scope", function ($scope) {
                
                $scope.hasFilter = false;
                
                $scope.$on("WallaShops.CategorySelected", function (e, args) {
                    
                    if (args.category.subCategoryId >= 0) {
                        $scope.hasFilter = true;
                    }

                });

            }],
            link: function(scope) {
 
            }
        };
    }];

})(_, Simple, WallaShops);