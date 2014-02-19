(function (_, S, WS) {

    WS.AppController = [
        "$scope",
        "$location",
        "categoryService",
        "productService",
        "textResource",
        "config",
    function ($scope, $location, categoryService, productService, textResource, config) {


        $scope.showProduct = function (product) {
            var wsUrl = config.wsUrl;
            console.log("showProduct:",wsUrl + "/" + product.nameForUrl);
            window.open(wsUrl + "/" + product.nameForUrl, "_blank");
        };

        $scope.$watch("currentCategory", function (category) {
            var fullPath = {};
            
            if (category) {
                if (category.isNewWindow) {
                    window.open(category.link + category.id, "_blank");
                } else {

                    fullPath.mainBreadCramb = textResource.get("MainBreadCramb") + "  > ";
                    fullPath.current = category.title;

                    if (category.parent) {
                        fullPath.parent = category.parent.title + " > ";

                        if (category.parent.parent) {
                            fullPath.ancestor = category.parent.parent.title + "  >  ";
                        }

                        if (category.level > 0) {
                            $location.path("/Search").search({
                                categoryId: category.id,
                                categoryName: category.title,
                                path: fullPath,
                                level: category.level,
                                mainCategoryId: category.mainCategoryId,
                                subCategoryId: category.subCategoryId,
                                parent: category.parent
                            });
                        }
                    }
                }
            } else {
                $location.path("/");
            }
        });

        function onCategorySelected(eventInfo, args) {
                $scope.currentCategory = args.category;
        }

        $scope.$on("WallaShops.SelectCategoryRequested", onCategorySelected);
        $scope.$on("WallaShops.CategorySelected", onCategorySelected);

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
            $location.path("/Search").search({
                searchTerm: $scope.searchTerm
            });
        };

    }];

})(_, Simple, WallaShops);



