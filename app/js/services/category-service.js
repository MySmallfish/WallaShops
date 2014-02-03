(function (_, S, WS) {

    WS.CategoryService = ["$q", "dailyCacheService", "wallaShopsApi", function ($q, dailyCacheService, wallaShopsApi) {
        var MenuCategoriesCacheKey = "menuCategories";

        function getCategories() {
            var menuCategories = dailyCacheService.get(MenuCategoriesCacheKey);
            var result;
            if (menuCategories) {
                result = $q.when(menuCategories);
            } else {

                var apiMenuCategories = wallaShopsApi.getMenuCategories();
                
                result = $q.when(apiMenuCategories).then(function (items) {
                    dailyCacheService.store(MenuCategoriesCacheKey, items);

                    return items;
                });
            }

            return result;
        }

        var categoryDetailsCache = {};

        function storeCategoryDetails(mainCategoryId, subCategoryId, categoryDetails) {
            var details = categoryDetailsCache[mainCategoryId];
            if (details) {
                if (subCategoryId) {
                    details.ChildCategories = details.ChildCategories || {};
                    details.ChildCategories[subCategoryId] = categoryDetails;
                }
            } else {
                if (subCategoryId) {
                    categoryDetailsCache[mainCategoryId] = {
                        ChildCategories: {}
                    };
                    categoryDetailsCache[mainCategoryId].ChildCategories[subCategoryId] = categoryDetails;
                } else {
                    categoryDetailsCache[mainCategoryId] = categoryDetails;
                }
            }
            return categoryDetails;
        }

        function getCategoryDetails(mainCategoryId, subCategoryId) {
            var details = categoryDetailsCache[mainCategoryId];
            if (details) {
                if (subCategoryId && subCategoryId != -1) {
                    details = details.ChildCategories ? details.ChildCategories[subCategoryId] : null;
                }
            }

            function storeInCache(categoryDetails) {
                return storeCategoryDetails(mainCategoryId, subCategoryId, categoryDetails);
            }

            function fetchCategoryDetails() {
                return wallaShopsApi.getCategoryDetails(mainCategoryId, subCategoryId);
            }

            if (details) {
                return $q.when(details);
            } else {
                return fetchCategoryDetails().then(storeInCache);
            }

        }

        function getFilters(category) {
            //correct category

            var result = $q.when([]);

            var categories = dailyCacheService.get(MenuCategoriesCacheKey);
            
            if (category && categories) {

                if (typeof category.filters !== "undefined") {
                    result = $q.when(category.filters);
                } else {
                    var mainCategoryId = category.mainCategoryId, subCategoryId = category.subCategoryId;
                    
                    if (mainCategoryId) {
                        result = getCategoryDetails(mainCategoryId, subCategoryId).then(function (fullApiCategory) {
                            category.filters = wallaShopsApi.mapCategoryFilters(fullApiCategory.Filters);
                            return category.filters;
                        });
                    }
                }

            }

            return result;
        }

        return {
            getCategories: getCategories,
            getFilters: getFilters
        };

    }];

})(_, Simple, WallaShops);