(function (_, S, WS) {

    WS.ProductService = ["$q", "dailyCacheService", "wallaShopsApi", function ($q, dailyCacheService, wallaShopsApi) {

        function getPromotionsCategories() {

            var promotionsCategories = dailyCacheService.get("promotionsCategories");
            var result;
            if (promotionsCategories) {
                result = $q.when(promotionsCategories);
            } else {

                var apiPromotionsCategories = wallaShopsApi.getPromotionsCategories();

                result = $q.when(apiPromotionsCategories).then(function (items) {
                    dailyCacheService.store("promotionsCategories", items);

                    return items;
                });
            }
            return result;
        }

        function search(parameters) {

            var result = 0;

            if (parameters.searchTerm) {
                result = wallaShopsApi.getSearchProducts(parameters.searchTerm);
            } else {
                if (parameters.mainCategoryId) {
                    result = wallaShopsApi.getMainCategoryProducts(parameters);
                } else if (parameters.subCategoryId) {
                    result = wallaShopsApi.getSubCategoryProducts(parameters);
                } else if (parameters.subSubCategoryId) {
                    result = wallaShopsApi.getSubSubCategoryProducts(parameters);
                }
            }

            return result;
        }

        return {
            getPromotionsCategories: getPromotionsCategories,
            
            search: search
        };

    }];

})(_, Simple, WallaShops);