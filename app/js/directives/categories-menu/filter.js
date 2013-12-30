﻿(function (_, S, WS) {

    WS.FilterDirective = [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/filter.html',
            scope: {
                load:"&"
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

        function publishFilterValueSelectedEvent() {
            publish("WallaShops.FilterValueSelected", {
                values: filterSelectedValue($scope.filters)
            });
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
            return $scope.selectedFilter === filter;
        };
        
        function clearSelectedFilter() {
            $scope.selectFilter(null);
        };
        
        function clearSelectedFilterValues() {
            _.each($scope.filters, function (filter) {
                $scope.selectFilterValue(filter, null);
            });
        };

        function isAnyFilterSelected() {
            return $scope.selectedFilter;
        };

        function selectFilter(filter) {

            $scope.selectedFilter = filter;
        };

        function selectFilterValue(filter, filterValue) {
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

        loadFilters();

    }];

})(_, Simple, WallaShops);