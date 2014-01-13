(function (_, S, WS) {

    WS.PromotionsService = ["$q", function ($q) {

        var seasonal_images = [
            {
                promotion: "app/img/pic4.png",
                name: "1"
            },
            {
                promotion: "app/img/pic4-1.png",
                name: "2"
            },
            {
                promotion: "app/img/pic4-2.png",
                name: "3"
            },
            {
                promotion: "app/img/pic4-3.png",
                name: "4"
            },
            {
                promotion: "app/img/pic4-4.png",
                name: "5"
            }
        ];
        

        function getSeasonalImages() {

            var result = $q.defer();


            result.resolve(seasonal_images);

            return result.promise;
        }

      

        return {
            getSeasonalImages: getSeasonalImages
        };

    }];

})(_, Simple, WallaShops);