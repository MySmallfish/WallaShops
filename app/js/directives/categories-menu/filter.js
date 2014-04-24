(function (_, S, WS) {

    WS.FilterDirective = [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/filter.html',
            scope: {
                load: "&",
                selectedCategory: "=",
                hasFilter:"="
            },
            controller: WS.FilterController,
            replace: true
        };
    }];

    WS.FilterController = ["$scope", function ($scope) {
        
        function loadFilters() {
            var result = $scope.load();

            if (result && result.then) {
                result.then(function (items) {
                    
                    $scope.filters = items;
                });
            } else {
                throw new Error("You must provide load method that returns promise");
            }
        }

        function publish(name, args) {
            $scope.$root.$broadcast(name, args);
        }

        function publishFilterSelectedEvent() {
            publish("WallaShops.FilterSelected", {
                values: $scope.filters
            });
        }        
    

        function publishFilterValueSelectedEvent() {
            publish("WallaShops.FilterValueSelected", {
                values: filterSelectedValue($scope.filters)
            });
        }

        function publishClearedEvent() {
            publish("WallaShops.publishCleared");
        }

        function filterSelectedValue(filtersArr) {
            return _.map(filtersArr, function (filter) {
                return {
                    key: filter.id,
                    text: filter.title,
                    value: filter.selectedValue
                };
            });
        };

        function isFilterSelected(filter) {
            return $scope.$root.selectedFilter === filter;
        };

        function clearSelectedFilter() {
            
            $scope.$root.selectedFilter = null;
        };
            
        function clearSelectedFilterValues() {

            _.each($scope.filters, function (filter) {
                filter.selectedValue = null;
            });
            $scope.$root.selectedFilterValues = null;
            clearSelectedFilter();
            publishClearedEvent();
        };

        function isAnyFilterSelected() {
            return $scope.$root.selectedFilter;
        };

        function selectFilter(filter) {
            
            if ($scope.$root.selectedFilter == filter) {
                clearSelectedFilter();
            } else {
                $scope.$root.selectedFilter = filter;
            }
            publishFilterSelectedEvent();
        };

        function selectFilterValue(filter, filterValue, $event) {
            $event.stopPropagation();
            filter.selectedValue = filterValue;
            publishFilterValueSelectedEvent();
            
        };

        function isFilterValueSelected(filter, filterValue) {
            return filter.selectedValue === filterValue;
        };


        _.extend($scope, {
            isFilterSelected: isFilterSelected,
            clearSelectedFilter: clearSelectedFilter,
            isAnyFilterSelected: isAnyFilterSelected,
            clearSelectedFilterValues: clearSelectedFilterValues,
            selectFilter: selectFilter,
            selectFilterValue: selectFilterValue,
            isFilterValueSelected: isFilterValueSelected

        });

        $scope.selectedFilter = null;
        $scope.$watch("filters", function (newValue) {
            $scope.hasFilter = !!newValue && !!newValue.length;
        });
        
        $scope.$watch("selectedCategory", loadFilters);
        if ($scope.selectedCategory) {
            loadFilters();
        }
        $scope.$on("WallaShops.clearSelectedFilterValues", function () {
            clearSelectedFilterValues();
        });



    }];

})(_, Simple, WallaShops);