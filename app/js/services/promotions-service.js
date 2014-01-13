(function (_, S, WS) {

    WS.PromotionsService = ["$q", function ($q) {

        
        

        function getCategories() {

            var result = $q.defer();


            result.resolve(categories);

            return result.promise;
        }

      

        return {
            getCategories: getCategories
        };

    }];

})(_, Simple, WallaShops);