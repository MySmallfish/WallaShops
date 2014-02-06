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
                    
                    //$scope.hasFilter = true;
                    //$scope.hasFilter = !!args.values;
                    
                    console.log("FILTER??");
                    
                });

            }],
            link: function(scope) {
 
            }
        };
    }];

})(_, Simple, WallaShops);