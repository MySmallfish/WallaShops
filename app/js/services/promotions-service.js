(function (_, S, WS) {

    WS.PromotionsService = ["$q", "dailyCacheService", "wallaShopsApi", function ($q, dailyCacheService, wallaShopsApi) {

        

        
        
        function getMainPromotions() {

            var mainPromotions = dailyCacheService.get("mainPromotions");
            var result;
            if (mainPromotions) {
                result = $q.when(mainPromotions);
            } else {

                var apiMainPromotions = wallaShopsApi.getMainPromotions();

                result = $q.when(apiMainPromotions).then(function (items) {
                    dailyCacheService.store("mainPromotions", items);

                    return items;
                });
            }

            return result;
        }

        function getSeasonalImages() {

            var seasonalImages = dailyCacheService.get("seasonalImages");
            var result;
            if (seasonalImages) {
                result = $q.when(seasonalImages);
            } else {

                var apiSeasonalImages = wallaShopsApi.getSeasonalImages();

                result = $q.when(apiSeasonalImages).then(function (items) {
                    dailyCacheService.store("seasonalImages", items);

                    return items;
                });
            }

            return result;
        }

        //function getSeasonalImages() {

        //    var result = $q.defer();


        //    result.resolve(seasonalImages);

        //    return result.promise;
        //}
        

        return {
            getSeasonalImages: getSeasonalImages,
            getMainPromotions: getMainPromotions
        };

    }];

})(_, Simple, WallaShops);