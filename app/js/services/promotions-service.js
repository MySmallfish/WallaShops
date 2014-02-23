(function (_, S, WS) {

    WS.PromotionsService = ["$q", "dailyCacheService", "wallaShopsApi", function ($q, dailyCacheService, wallaShopsApi) {

        function openPromotion(url) {
            window.open(url, "_blank");
        }
        
        function getMainPromotions() {
            return wallaShopsApi.getMainPromotions();
        }
        
        function getSeasonalImages() {
            var seasonalImages = [
                wallaShopsApi.getTopSeasonalImages(),
                wallaShopsApi.getBottomSeasonalImages()
            ];

            return $q.all(seasonalImages).then(function(results) {
                return {
                    top: results[0],
                    bottom: results[1]
                };
            });
        }

        return {
            getSeasonalImages: getSeasonalImages,
            getMainPromotions: getMainPromotions,
            openPromotion: openPromotion
        };

    }];

})(_, Simple, WallaShops);