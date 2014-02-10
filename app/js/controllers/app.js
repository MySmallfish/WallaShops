(function (_, S, WS) {

    WS.AppController = [
        "$scope",
        "$location",
        "categoryService",
        "productService",
        "textResource",
    function ($scope, $location, categoryService, productService, textResource) {
            $scope.showProduct = function (product) {
                window.open("http://www.google.com/?q=" + product.id, "_blank");
            };
            $scope.$watch("currentCategory", function (newValue) {
                console.log("CATs", newValue);
            });
            
            $scope.$on("WallaShops.CategorySelected", function (eventInfo, args) {
                $scope.currentCategory = args.category;
                var fullPath = {};
                
                if (args.category) {
                    if (args.category.isNewWindow) {
                        window.open(args.category.link + args.category.id, "_blank");
                    } else {
                        
                        if (args.category.parent.parent) {
                            
                            fullPath.path = textResource.get("MainBreadCramb") + " > " + args.category.parent.parent.title + "  >  " + args.category.parent.title + " > ";
                            fullPath.current = args.category.title;
                            
                        } else if (args.category.parent) {
                            
                            fullPath.path = textResource.get("MainBreadCramb") + " > " + args.category.parent.title + "  >  ";
                            fullPath.current = args.category.title;
                            
                        } else {
                            fullPath.path = textResource.get("MainBreadCramb") + " >  ";
                            fullPath.current = args.category.title;
                        }

                        if (args.category.level > 0) {
                            $location.path("/Search").search({
                                categoryId: args.category.id,
                                categoryName: args.category.title,
                                path: fullPath,
                                level: args.category.level,
                                mainCategoryId: args.category.mainCategoryId,
                                subCategoryId: args.category.subCategoryId,
                                parent: args.category.parent
                            });
                        }
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
                return categoryService.getFilters($scope.currentCategory);

            };

            $scope.searchText = function () {
                console.log("SEARCH:", $scope.searchTerm);
                $location.path("/Search").search({
                    searchTerm: $scope.searchTerm
                });
            };

        }];

})(_, Simple, WallaShops);



