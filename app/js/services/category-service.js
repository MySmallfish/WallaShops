﻿(function (_, S, WS) {

    WS.CategoryService = ["$q", "dailyCacheService", "wallaShopsApi", function ($q, dailyCacheService, wallaShopsApi) {


        function getCategories() {

            var categories = dailyCacheService.get("categories");
            var result;
            if (categories) {
                result = $q.when(categories).then(function (items) {
                    return items;
                });
            } else {
                
                var apiCategories = wallaShopsApi.categories;
                
                result = $q.when(apiCategories).then(function (items) {
                    dailyCacheService.store("categories", items);

                    return items;
                });
            }

            return result;
        }

        function getFilters() {

            var filters = dailyCacheService.get("filters");
            var result;
            if (filters) {
                result = $q.when(filters).then(function (items) {
                    return items;
                });
            } else {
                
                var apiFilters = wallaShopsApi.filters;

                result = $q.when(apiFilters).then(function (items) {
                    dailyCacheService.store("filters", items);

                    return items;
                });
            }

            return result;
        }

        return {
            getCategories: getCategories,
            getFilters: getFilters
        };

    }];

})(_, Simple, WallaShops);