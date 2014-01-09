(function (_, S, WS) {

    WS.CategoriesDirective = [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/categories.html',
            scope: {
                load: "&"
            },
            controller: WS.CategoriesController,
            replace: true
        };
    }];


    WS.CategoriesController = ["$scope",  function ($scope) {

        function loadCategories(lastSelected) {
            if ($scope.selectedCategory) {
                if (lastSelected && lastSelected.level == 0 && $scope.selectedCategory.level == 1) {
                    $scope.categories = lastSelected.categories;
                }
            } else {
                
                var result = $scope.load();
                if (result && result.then) {
                    result.then(function (items) {
                        $scope.categories = items;
                    });
                } else {
                    throw new Error("You must provide load method that returns promise");
                }

            }
        }

        function publish(name, args) {
            $scope.$root.$broadcast(name, args);
        }

        function publishCategorySelectedEvent(lastSelected) {
            publish("WallaShops.CategorySelected", {
                previous: lastSelected,
                category: $scope.selectedCategory
            });

        }

        function clearSelectedCategory() {
            $scope.selectCategory(null);
        };

        function isSelected(category) {
            return $scope.selectedCategory === category;
        };

        function isAnythingSelected() {
            return $scope.selectedCategory;
        };

        function selectCategory(category) {

            if (category && category.extarnalLink) {
                window.open(category.extarnalLink.url);
            } else {
                var lastSelected = $scope.selectedCategory;
                $scope.selectedCategory = category;

                loadCategories(lastSelected);

                publishCategorySelectedEvent(lastSelected);
            }
        };
        
        _.extend($scope, {
            clearSelectedCategory: clearSelectedCategory,
            isSelected: isSelected,
            isAnythingSelected: isAnythingSelected,
            selectCategory: selectCategory

        });

        $scope.selectedCategory = null;
        
        loadCategories();

    }];
})(_, Simple, WallaShops);