(function (_, S, WS) {
    
    WS.CategoriesMenuController = ["$scope", "categoryService", function ($scope, categoryService) {
        var categories = null;
        var filters = null;
        
        categoryService.getCategories().then(function(items) {
            categories = items;
            
            loadCategories();
        }, function(e) {
            console.log("Error", e);
        });
        
        categoryService.getFilters().then(function (items) {
            filters = items;

            loadFilters();
        }, function (e) {
            console.log("Error", e);
        });
        
        $scope.selectedCategory = null;

        function loadCategories(lastSelected) {
            if ($scope.selectedCategory) {
                if (lastSelected && lastSelected.level == 0 && $scope.selectedCategory.level == 1) {
                    $scope.categories = lastSelected.categories;
                }
            } else {
                $scope.categories = categories;
            }
        }
        
        function loadFilters(lastSelected) {
            if ($scope.selectedCategory) {
                if (lastSelected && lastSelected.level == 0 && $scope.selectedCategory.level == 1) {
                    $scope.filters = lastSelected.filters;
                }
            } else {
                $scope.filters = filters;
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

        $scope.clearSelectedCategory = function() {
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
                loadFilters(lastSelected); /////////////////////////////////////////////////////////////

                publishCategorySelectedEvent(lastSelected);
            }
        };
    }];

})(_, Simple, WallaShops);