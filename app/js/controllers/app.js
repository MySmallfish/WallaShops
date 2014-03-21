(function (_, S, WS) {

    WS.AppController = [
        "$scope",
        "$location",
        "productDetailsPresenter",
        "categoryService",
        "$q",
    function ($scope, $location, productDetailsPresenter, categoryService, $q) {
        $scope.stopProgress = function() {
            $scope.loading = false;
        };

        $scope.notifyProgress = function(context) {
            $scope.loading = true;
            return $q.when(context);
        };


        $scope.productsToCompare = [];

        $scope.publishRemoveProduct = function () {
            $scope.$root.$broadcast("WallaShops.ProductDeleted", { product: $scope.product });
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



