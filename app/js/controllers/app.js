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
                        
                        if (args.category.parent.parent) {
                            
                            $scope.fullPath.path = textResource.get("MainBreadCramb") + " > " + args.category.parent.parent.title + "  >  " + args.category.parent.title + " > ";
                            $scope.fullPath.current = args.category.title;
                            
                        } else if (args.category.parent) {
                            
                            $scope.fullPath.path = textResource.get("MainBreadCramb") + " > " + args.category.parent.title + "  >  ";
                            $scope.fullPath.current = args.category.title;
                            
                        } else {
                            $scope.fullPath.path = textResource.get("MainBreadCramb") + " >  ";
                            $scope.fullPath.current = args.category.title;
                        }

                        if (args.category.level > 0) {
                            $location.path("/Search").search({ categoryId: args.category.id, categoryName: args.category.title, path: $scope.fullPath, level: args.category.level });
                        }
                        console.log("PATH:", $scope.path);
                    }
                } else {
                    $location.path("/");
                }

            });

            $scope.$on("WallaShops.FilterValueSelected", function (eventInfo, args) {
                $scope.$root.selectedFilterValues = args;
                console.log("FIFI:", $scope.$root.selectedFilterValues);
            });

            $scope.loadCategories = function () {
                return categoryService.getCategories();
            };

            $scope.loadFilters = function () {
                return categoryService.getFilters($scope.currentCategory);

            };
            
            $scope.fullPath = {};

        }];

})(_, Simple, WallaShops);



