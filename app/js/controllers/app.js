(function (_, S, WS) {

    WS.AppController = [
        "$scope",
        "$location",
        "categoryService",
        "textResource",
        function ($scope, $location, categoryService, textResource) {
            $scope.showProduct = function (product) {
                window.open("http://www.google.com/?q=" + product.id, "_blank");
            };
            $scope.$watch("currentCategory", function (newValue) {
                console.log("CATs", newValue);
            });
            $scope.$on("WallaShops.CategorySelected", function (eventInfo, args) {
                $scope.currentCategory = args.category;

                if (args.category) {
                    if (args.category.isNewWindow) {
                        window.open(args.category.link + args.category.id, "_blank");
                    } else {
                        var path = null;
                        if (args.category.parent) {
                            path = textResource.get("MainBreadCramb") + args.category.parent.title + " > " + args.category.title;
                        } else {
                            path = textResource.get("MainBreadCramb") + args.category.title;
                        }
                        $location.path("/Search").search({ categoryId: args.category.id, categoryName: args.category.title, path: path, level: args.category.level });
                    }
                } else {
                    $location.path("/");
                }
            });

            $scope.$on("WallaShops.FilterValueSelected", function (eventInfo, args) {
                $scope.$root.selectedFilterValues = args;
            });

            $scope.loadCategories = function () {
                return categoryService.getCategories();
            };

            $scope.loadFilters = function () {
                //correct currentCategory

                return categoryService.getFilters($scope.currentCategory);

            };


        }];

})(_, Simple, WallaShops);



