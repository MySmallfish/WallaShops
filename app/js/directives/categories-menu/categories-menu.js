(function (_, S, WS) {

    WS.CategoriesMenuDirective = [function() {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/categories-menu.html',
            scope: {
                filters: "=",
                load:"&"
            },
            controller: WS.CategoriesMenuController,
            replace:true
        };
    }];


    WS.CategoriesMenuController = ["$scope", "categoryService", function ($scope, categoryService) {
        
        loadCategories();
        
        $scope.selectedCategory = null;

        function loadCategories(lastSelected) {
            if ($scope.selectedCategory) {
                if (lastSelected && lastSelected.level == 0 && $scope.selectedCategory.level == 1) {
                    $scope.categories = lastSelected.categories;
                }
            } else {
                $scope.load().then(function (items) {
                    $scope.categories =  items;
                });
            }
        }

        function publish(name, args) {
            $scope.$root.$broadcast(name, args);
        }

        function publishCategorySelectedEvent(lastSelected) {
            publish("WallaShops.CategorySelected", {
                previous: lastSelected,
                catgory: $scope.selectCategory
            });

        }

        $scope.clearSelectedCategory = function () {
            $scope.selectCategory(null);
        };

        $scope.isSelected = function (category) {
            return $scope.selectedCategory === category;
        };

        $scope.isAnythingSelected = function () {
            return $scope.selectedCategory;
        };

        $scope.selectCategory = function (category) {

            if (category && category.extarnalLink) {
                window.open(category.extarnalLink.url);
            } else {
                var lastSelected = $scope.selectedCategory;
                $scope.selectedCategory = category;

                loadCategories(lastSelected);

                publishCategorySelectedEvent(lastSelected);
            }
        };


        /***************************************filters****************************************/


        var filters = null;

        categoryService.getFilters().then(function (items) {
            filters = items;

            loadFilters();
        }, function (e) {
            console.log("Error", e);
        });

        $scope.selectedFilter = null;

        function loadFilters() {
            $scope.filters = filters;
        }
        
        function publish(name, args) {
            $scope.$root.$broadcast(name, args);
        }
        
        function publishFilterValueSelectedEvent() {
            publish("WallaShops.FilterValueSelected", {
                values: filterSelectedValue($scope.filters)
            });
        }

        $scope.clearSelectedFilter = function () {
            $scope.selectFilter(null);
        };

        $scope.clearSelectedFilterValues = function () {
            _.each($scope.filters, function (filter) {
                $scope.selectFilterValue(filter, null);
            });
        };

        function filterSelectedValue(filtersArr) {
            return _.map(filtersArr, function (filter) {
                return {
                    key: filter.id,
                    text: filter.title,
                    value: filter.selectedValue
                };
            });
        };


        $scope.isFilterSelected = function (filter) {
            return $scope.selectedFilter === filter;
        };

        $scope.isAnyFilterSelected = function () {
            return $scope.selectedFilter;
        };

        $scope.selectFilter = function (filter) {
            $scope.selectedFilter = filter;
        };

        $scope.selectFilterValue = function (filter, filterValue) {
            filter.selectedValue = filterValue;
            publishFilterValueSelectedEvent();
        };

        $scope.isFilterValueSelected = function (filter, filterValue) {
            return filter.selectedValue === filterValue;
        };


    }];

})(_, Simple, WallaShops);