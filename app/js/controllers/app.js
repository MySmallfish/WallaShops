(function (_, S, WS) {

    WS.AppController = ["$scope", "categoryService",function ($scope, categoryService) {

        $scope.$on("WallaShops.CategorySelected", function (eventInfo, args) {
            console.log("CATEGORY!!!! ", args);
        });

        $scope.$on("WallaShops.FilterValueSelected", function (eventInfo, args) {
            console.log(args);
        });

        //$scope.categoriesPopOver = {
        //    content: "categories-menu.html",
        //    placement: "bottom",
        //    trigger:"click"
        //};
        $scope.loadCategories = function () {
            
            return categoryService.getCategories();
        };

        $scope.loadFilters = function () {
            return categoryService.getFilters();
        };        

        
    }];

})(_, Simple, WallaShops);



