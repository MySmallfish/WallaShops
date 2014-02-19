(function (_, S, WS) {

    WS.DailyCacheService = [function () {

        function getDateKey(today) {
            return moment(today).format("YYYY-MM-D");
        }

        function getTomorow(today) {
            return moment(today).add('days', 1).format("YYYY-MM-D");
        }

        var storage = {
            ExpireAt: getTomorow(new Date()),
            Storage: {}
        };

        function setExpirationDate() {
            if (storage && storage.ExpireAt) {
                if (storage.ExpireAt != getTomorow(new Date())) {
                    storage.ExpireAt = getTomorow(new Date());
                }
            }
        }

        function setLocalStorage(key, value) {
            localStorage.setItem(key, value);
        }

        function store(key, value) {
            storage.Storage[key] = value;
            setLocalStorage("dailyCache", JSON.stringify(storage));
        }

        function get(key) {

            var result = storage[key];

            return result;
        }

        function load() {
            setExpirationDate();

            var local = localStorage.getItem("dailyCache");
            if (local) {
                if (storage.ExpireAt == getDateKey(new Date())) {
                    storage = JSON.parse(local);
                }
            }

        }

        load();

        return {
            store: store,
            get: get,
            load: load
        };
    }];

})(_, Simple, WallaShops);