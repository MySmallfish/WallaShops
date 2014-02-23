(function (_, S, WS) {

    WS.AppController = [
        "$scope",
        "$location",
        "productDetailsPresenter",
        "categoryService",
        "productService",
        "textResource",
    function ($scope, $location, productDetailsPresenter, categoryService, productService, textResource) {
        

        $scope.productsToCompare = [];
        $scope.selectionMode = false;

        $scope.showProduct = function (product) {
            productDetailsPresenter.showProduct(product);
        };

        $scope.$watch("currentCategory", function (category) {
            $scope.fullPath = {};
            
            if (category) {
                if (category.isNewWindow) {
                    window.open(category.link + category.id, "_blank");
                } else {

                    $scope.fullPath.mainBreadCramb = textResource.get("MainBreadCramb") + "  > ";
                    $scope.fullPath.current = category.title;

                    if (category.parent) {
                        $scope.fullPath.parent = category.parent.title + " > ";

                        if (category.parent.parent) {
                            $scope.fullPath.ancestor = category.parent.parent.title + "  >  ";
                        }

                        if (category.level > 0) {
                            $location.path("/Search");
                            /*.search({
                                categoryId: category.id,
                                categoryName: category.title,
                                level: category.level,
                                mainCategoryId: category.mainCategoryId,
                                subCategoryId: category.subCategoryId,
                                parent: category.parent
                            });*/
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



