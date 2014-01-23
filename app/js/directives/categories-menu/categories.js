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


    WS.CategoriesController = ["$scope", "dailyCacheService", function ($scope, dailyCacheService) {
        var storage = dailyCacheService.get("CategoriesMenu-Cache");

        if (!storage) {
            storage = {};
            dailyCacheService.store("CategoriesMenu-Cache", storage);
        }

        function loadRootCategories() {
            var result = $scope.load();
            if (result && result.then) {
                result.then(function (items) {
                    $scope.categories = items;
                });
            } else {
                throw new Error("You must provide load method that returns promise");
            }
        
        }

        function loadCategories(lastSelected) {
            console.log(storage, $scope.selectedCategory, lastSelected);
            if ($scope.selectedCategory) {
                if (lastSelected && lastSelected.level == 0 && $scope.selectedCategory.level == 1) {
                    $scope.categories = lastSelected.categories;
                } else {
                    loadRootCategories();
                }
            } else {
                loadRootCategories();
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
        }

        function isSelected(category) {
            return $scope.selectedCategory === category;
        }

        function isAnythingSelected() {
            return $scope.selectedCategory;
        }

        function isChildCategorySelected(category) {
            return _.some(category.categories, isSelected);
        }

        function isExpanded(category) {
            return category.categories.length && (isSelected(category) || isChildCategorySelected(category));
        }

        function selectCategory(category) {
            event.stopPropagation();
            if (category && category.extarnalLink) {
                window.open(category.extarnalLink.url,"_blank");
            } else {
                var lastSelected = $scope.selectedCategory;
                $scope.selectedCategory = category;

                storage.selected = $scope.selectedCategory;
                storage.lastSelected = lastSelected;

                loadCategories(lastSelected);

                publishCategorySelectedEvent(lastSelected);
            }
        };
        
        function isThirdLevel(category) {
            var result = 0;
            if (category.level === 3) {
                result = 1;
            }
            return result;
        }
        
        _.extend($scope, {
            clearSelectedCategory: clearSelectedCategory,
            isSelected: isSelected,
            isAnythingSelected: isAnythingSelected,
            selectCategory: selectCategory,
            isThirdLevel: isThirdLevel,
            isExpanded: isExpanded
        });
        
        $scope.selectedCategory = storage.selected;
        
        loadCategories(storage.lastSelected);
        
        

    }];
})(_, Simple, WallaShops);