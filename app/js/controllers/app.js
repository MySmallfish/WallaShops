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
            if (category) {
                if (category.isNewWindow) {
                    window.open(category.link + category.id, "_blank");
                } else if (category.parent) {
                    $location.path("/Search");

                }
            } else {
                $location.path("/");
            }
        });

        function onCategorySelected(eventInfo, args) {
            $scope.searchTerm = null;
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
            $location.path("/Search");
        };
        $scope.loadCategories();
    }];

})(_, Simple, WallaShops);



