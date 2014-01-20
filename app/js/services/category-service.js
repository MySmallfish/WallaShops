(function (_, S, WS) {

    WS.CategoryService = ["$q", "dailyCacheService", "wallaShopsApi", function ($q, dailyCacheService, wallaShopsApi) {


        function getCategories() {

            var menuCategories = dailyCacheService.get("menuCategories");
            var result;
            if (menuCategories) {
                result = $q.when(menuCategories);
            } else {
                
                var apiMenuCategories = wallaShopsApi.getMenuCategories();
                
                result = $q.when(apiMenuCategories).then(function (items) {
                    dailyCacheService.store("menuCategories", items);

                    return items;
                });
            }

            return result;
        }
        


        function getFilters(categoryId) {

            //var categories = dailyCacheService.get("categories");
            //var result;
            
            //if (categories) {
            //    if (categories.hasFilter) {
            //        console.log("IF");
            //        result = $q.when(categories);
            //    }
            //} else {
            //    console.log("ELSE");
            //    var apiCategories = wallaShopsApi.getCategories();

            //    result = $q.when(apiCategories).then(function (items) {
            //        dailyCacheService.store("categories", items);

            //        return items;
            //    });
            //}

            // has catgories cache??
            // find category from cache by categoryId (use _.find)
            // if category has filters, return them ($q.when)
            // else, call api, store in category.filters, return filters


            var filters = dailyCacheService.get("filters");
            console.log("FILTERS", filters);
            var result;
            if (filters) {
                result = $q.when(filters).then(function (items) {
                    return items;
                });
            } else {
                
                var apiFilters = wallaShopsApi.getFilters();
                
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