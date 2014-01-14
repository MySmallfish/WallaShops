(function (_, S, WS) {

    WS.AppController = [
        "$scope",
        "$location",
        "categoryService",
        function ($scope, $location, categoryService) {
            $scope.showProduct = function (product) {    
                //window.open("http://www.google.com/?q=" + product.id, "_blank");

                var ref = window.open("http://google.com", "_blank");
                ref.addEventListener("loadstop", function () {
                    navigator.notification.alert("LOAD STOP!");
                });
                ref.addEventListener("loadstart", function () {
                    navigator.notification.alert("LOAD Start!");
                });
                ref.addEventListener("exit", function () {
                    navigator.notification.alert("BYE!");
                });


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



