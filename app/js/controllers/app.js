(function (_, S, WS) {

    WS.AppController = [
        "$scope",
        "$location",
        "$window",
        "productDetailsPresenter",
        "categoryService",
        "$q",
    function ($scope, $location, $window, productDetailsPresenter, categoryService, $q) {
        $scope.stopProgress = function () {
            $scope.loading = false;
        };

        $scope.notifyProgress = function (context) {
            $scope.loading = true;
            return $q.when(context);
        };

        $scope.productsToCompare = [];

        $scope.publishRemoveProduct = function (product) {

            $scope.$root.$broadcast("WallaShops.ProductDeleted", { product: product });
        };

        $scope.goBack = function () {
            $window.history.back();
        };

        function onProductDeleted(eventInfo, args) {
            $scope.productsToCompare.splice($scope.productsToCompare.indexOf(args.product), 1);

        };

        $scope.$on("WallaShops.ProductDeleted", onProductDeleted);

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

        $scope.home = function () {
            $scope.$root.$broadcast("WallaShops.ClearCategoriesRequested");

            clearProductsToCompare();
            clearSelectedFilterValues();
            selectCategoriesTab();
            $location.path("/");
            return false;
        }

        function clearProductsToCompare() {
            $scope.productsToCompare = [];
        }

        function clearSelectedFilterValues() {
            $scope.$root.$broadcast("WallaShops.clearSelectedFilterValues");
        }

        function onCategorySelected(eventInfo, args) {

            if (args.category.level === 1 || args.category.level === 0) {
                clearProductsToCompare();
                clearSelectedFilterValues();
            }

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
        $scope.isCategories = true;

        function selectCategoriesTab() {
            $scope.$root.$broadcast("WallaShops.MenuTabSelected", { tab: "Category"});
        }

        $scope.$on("WallaShops.MenuTabSelected", function(eventInfo, args) {
            $scope.isCategories = args.tab == "Category";
        });
        

        $scope.loadCategories();


    }];

})(_, Simple, WallaShops);



