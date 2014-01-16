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

        return {
            getPromotionsCategories: getPromotionsCategories,
            
        };

    }];

})(_, Simple, WallaShops);