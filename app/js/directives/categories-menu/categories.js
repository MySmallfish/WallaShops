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

        function resetStorage() {
            if (!storage) {
                storage = {};
                dailyCacheService.store("CategoriesMenu-Cache", storage);
            }
        }

        resetStorage();

        function loadRootCategories() {
            var result = $scope.load();
            if (result && result.then) {
                result.then(function (items) {

                    setStorageCategories(items);

                });
            } else {
                throw new Error("You must provide load method that returns promise");
            }
        }

        function setStorageCategories(categories) {
            $scope.categories = storage.lastCategories = categories;
        }

        function loadCategories(lastSelected) {
            if ($scope.selectedCategory) {
                if (lastSelected) {
                    if (lastSelected.level == 0 && $scope.selectedCategory.level == 1) {
                        setStorageCategories(lastSelected.categories);
                    } else {
                        setStorageCategories(storage.lastCategories);
                    }
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
            $scope.selectedCategory = null;
            storage = null;
            resetStorage();
            loadRootCategories();
        }

        function isSelected(category) {
            return category && $scope.selectedCategory === category;
        }

        function isAnythingSelected() {
            return $scope.selectedCategory;
        }

        function isChildCategorySelected(category) {
            return _.some(category.categories, isSelected);
        }

        function isExpanded(category) {

            return category.categories.length && (isSelected(category) || isChildCategorySelected(category) || isSelected(category.parent));
        }

        function selectCategory(category) {
            //event.stopPropagation();
            if (category && category.extarnalLink) {
                window.open(category.extarnalLink.url, "_blank");
            } else {

                var lastSelected = $scope.selectedCategory;
                $scope.selectedCategory = category;
                storage.selected = $scope.selectedCategory;
                storage.lastSelected = lastSelected;
                if ($scope.selectedCategory.level < 2) {
                    loadCategories(lastSelected);
                }

                if (category.level > 0) {
                    publishCategorySelectedEvent(lastSelected);
                }
            }
        };

        _.extend($scope, {
            clearSelectedCategory: clearSelectedCategory,
            isSelected: isSelected,
            isAnythingSelected: isAnythingSelected,
            selectCategory: selectCategory,
            isExpanded: isExpanded
        });

        $scope.selectedCategory = storage.selected;

        loadCategories(storage.lastSelected);



    }];
})(_, Simple, WallaShops);