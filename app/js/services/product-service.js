(function (_, S, WS) {

    WS.ProductService = ["$q", "dailyCacheService", "wallaShopsApi", "remoteStorage", "fileManager",  function ($q, dailyCacheService, wallaShopsApi, remoteStorage, fileManager) {

        function getOtherInterestedPromotionsCategories() {

            return wallaShopsApi.getOtherInterestedPromotionsCategories();
        }

        function getBestSellersPromotionsCategories() {

            return wallaShopsApi.getBestSellersPromotionsCategories();
        }

        function getPromotionsCategories() {

            return wallaShopsApi.getPromotionsCategories();
        }


        function search(parameters) {

            var result = $q.when({});

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
            getOtherInterestedPromotionsCategories: getOtherInterestedPromotionsCategories,
            getBestSellersPromotionsCategories: getBestSellersPromotionsCategories,
            getPromotionsCategories: getPromotionsCategories,
            search: search
        };

    }];

})(_, Simple, WallaShops);