(function (_, S, WS) {

    WS.AppController = [
        "$scope",
        "$location",
        "categoryService",
        function ($scope, $location, categoryService) {
            $scope.showProduct = function (product) {    
                window.open("http://www.google.com/?q=" + product.id, "_blank");



            };

            $scope.$on("WallaShops.CategorySelected", function (eventInfo, args) {
                console.log(args.category);
                if (args.category) {
                    $location.path("/Search");
                } else {
                    $location.path("/");
                }
            });

            $scope.$on("WallaShops.FilterValueSelected", function (eventInfo, args) {
                console.log(args);
            });

            $scope.loadCategories = function () {
                return categoryService.getCategories();
            };

            $scope.loadFilters = function () {
                return categoryService.getFilters();
            };


        }];

})(_, Simple, WallaShops);



