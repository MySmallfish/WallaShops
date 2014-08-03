(function (_, S, WS) {

    WS.AppController = [
        "$scope",
        "$location",
        "$window",
        "productDetailsPresenter",
        "categoryService",
        "$timeout",
        "$q",
        "safeApply",
    function ($scope, $location, $window, productDetailsPresenter, categoryService, $timeout, $q, safeApply) {
        $scope.categoryMenuSelected = true;
        $scope.toggleMenu = function () {
            event.stopPropagation();

            $scope.menuVisible = !$scope.menuVisible;
        };
        $scope.hideMenu = function () {
            $scope.menuVisible = false;
            safeApply($scope);
        };

        $(".content-container").click(function () {
            $scope.menuVisible = false;
        });

        $scope.selectCategoriesMenu = function (event) {

            event.stopPropagation();
            if (!$scope.categoryMenuSelected) {
                $scope.categoryMenuSelected = true;
                $scope.filtersSelected = false;
            }
        };
        $scope.selectFiltersMenu = function (event) {

            event.stopPropagation();
            if (!$scope.filtersSelected) {
                $scope.categoryMenuSelected = false;
                $scope.filtersSelected = true;
            }

        };



        categoryService.getCategories().then(function (categories) {

            $scope.menuItems = categories;
        });

        function loadFilters(category) {
            $scope.filters = [];
            return categoryService.getFilters(category).then(function (filters) {
                $scope.filters = filters;
            });
        }


        $scope.stopProgress = function () {
            $scope.loading = false;
        };

        $scope.notifyProgress = function (context) {
            $scope.loading = true;
            return $q.when(context);
        };

        clearProductsToCompare();

        $scope.publishRemoveProduct = function (product, $event) {
            $event.stopPropagation();
            
            $scope.$root.$broadcast("WallaShops.ProductDeleted", { product: product });
        };

        $scope.goBack = function () {
            clearProductsToCompare();
            $window.history.back();
        };

        function onProductDeleted(eventInfo, args) {
            if ($scope.$root.productsToCompare) {
                var indexOfProduct = $scope.$root.productsToCompare.indexOf(args.product);
                $scope.$root.productsToCompare = $scope.$root.productsToCompare.splice(indexOfProduct, 1);
            }
        };

        $scope.$on("WallaShops.ProductDeleted", onProductDeleted);

        $scope.showProduct = function (product) {
            productDetailsPresenter.showProduct(product);
        };

        $scope.$watch("currentCategory", function (category) {
            $scope.clear(false, category);

            if (category) {
                if (category.isNewWindow && category.type == 2) {
                    window.open(category.link, "_blank");
                } else if (category.level > 0 && (category.type == 3 || category.type == 4)) {
                    if (category.level == 2) {
                        loadFilters(category);
                    }
                    $location.path("Category");
                }
            }
        });

        $scope.clear = function (leaveSearch, leaveCategory) {
            if (!leaveCategory) {
                $scope.$root.$broadcast("WallaShops.ClearCategoriesRequested");
            }
            $scope.categoryMenuSelected = true;
            $scope.filtersSelected = false;
            if (!leaveSearch) {
                $scope.searchText = "";
                $scope.searchTerm = "";
            }
            clearProductsToCompare();
            clearSelectedFilterValues();
            selectCategoriesTab();
        }

        $scope.home = function () {
            $location.path("/");
            return false;
        }

        function clearProductsToCompare() {
            $scope.productsToCompare = [];
            $scope.canCheck = true;
            
        }

        $scope.$on("WallaShops.clearSelectedFilterValues", clearSelectedFilterValues);
        $scope.$watch("selectedFilterValues", function(value) {
            $scope.$root.isFiltered = value && value.length;
        }, true);
        function clearSelectedFilterValues() {
            $scope.$root.selectedFilterValues = null;
            
        }

        $scope.$on("WallaShops.ProductChecked", function (eventInfo, args) {
            var index = $scope.productsToCompare.indexOf(args.product);

            if (index >= 0) {
                $scope.productsToCompare.splice(index, 1);
            } else {
                $scope.productsToCompare.push(args.product);
            }

            $scope.canCheck = $scope.productsToCompare.length < 4;
            $scope.hideMenu();
        });

        $scope.$watch("currentFilter", function (filter) {
            clearProductsToCompare();
            if (filter) {
                var filterValues = $scope.$root.selectedFilterValues || [];

                var sameGroupFilter = _.find(filterValues, function(filterValue) {
                    return filterValue.key == filter.parent;
                });

                if (sameGroupFilter) {
                    filterValues.splice(_.indexOf(filterValues, sameGroupFilter), 1);
                }
                if (!sameGroupFilter || sameGroupFilter.id != filter.id) {
                    filterValues.push({ key: filter.parent, text: filter.title, value: filter.id });
                }
                $scope.$root.selectedFilterValues = filterValues;
            }
        });
        
        $scope.search = function () {

            if ($location.path() != "/Search") {
                $location.path("/Search");
            } else {
                $scope.$broadcast("WallaShops.Search");
            }

        };
        $scope.isCategories = true;

        function selectCategoriesTab() {
            $scope.$root.$broadcast("WallaShops.MenuTabSelected", { tab: "Category" });
        }

        $scope.$on("WallaShops.ClearAll", function (eventInfo, args) {
            $scope.clear();
            $scope.home();
        });
        $scope.$on("WallaShops.MenuTabSelected", function (eventInfo, args) {
            $scope.isCategories = args.tab == "Category";
        });

        $timeout($scope.loadCategories, 350);


    }];

})(_, Simple, WallaShops);



