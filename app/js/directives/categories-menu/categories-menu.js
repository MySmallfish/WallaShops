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
            controller: ["$scope", function ($scope) {
                $scope.hasFilter = false;
                console.log("HAS?", $scope.hasFilter);
                $scope.$on("WallaShops.FilterValueSelected", function (e, args) {
                    
                    $scope.hasFilter = !!args.values; 
                });

            }],
            link: function(scope) {
 
            }
        };
    }];

})(_, Simple, WallaShops);