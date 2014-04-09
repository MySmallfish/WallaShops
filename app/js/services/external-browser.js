(function (_, S, WS) {

    WS.ExternalBrowser = ["config", function (config) {

        var wsUrl = config.wsUrl;

        function open(relativeUrl) {
            var url = encodeURI(wsUrl + relativeUrl);
            url += (url.indexOf("?") >= 0 ? "&" : "?") + "tablet=1";
            window.open(url , '_blank', 'location=no');
        };

        return {
            open: open
        };
    }];

})(_, Simple, WallaShops);