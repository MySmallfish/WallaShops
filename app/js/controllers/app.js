(function (_, S, WS) {

    WS.AppController = ["$scope", "categoryService",function ($scope, categoryService) {

        $scope.$on("WallaShops.CategorySelected", function (eventInfo, args) {
            console.log("CATEGORY!!!! ", args);
        });

        $scope.$on("WallaShops.FilterValueSelected", function (eventInfo, args) {
            console.log(args);
        });

        $scope.loadCategories = function() {
            return categoryService.getCategories();
        };        


    }];

})(_, Simple, WallaShops);



