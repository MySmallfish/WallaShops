(function (_, S, WS) {

    WS.DailyCacheService = [function () {

        function getDateKey(date) {
            return moment(date).format("YYYY-MM-D");
        }

        var storage = {
            ExpireAt: getDateKey(new Date()),
            Storage: {}
        };

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

            var today = moment(new Date()).format("YYYY-MM-D");

            var local = localStorage.getItem("dailyCache");
            if (local) {
                storage = JSON.parse(local);
            }

            if (today == storage.ExpireAt) {
                console.log("no update");
            }
            else {
                console.log("update");
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