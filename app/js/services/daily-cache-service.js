(function (_, S, WS) {

    WS.DailyCacheService = ["$cacheFactory", function ($cacheFactory) {

        var dailyCache = $cacheFactory('wallaShops');

        function store(key, value) {
            dailyCache.put(key, value);
        }

        function get(key) {
            var result = dailyCache.get(key);

            return result;
        }
        
        return {
            store: store,
            get: get
        };
    }];

})(_, Simple, WallaShops);