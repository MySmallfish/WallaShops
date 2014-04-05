(function (_, S, WS) {

    WS.ProductDetailsPresenter = ["config", "analytics", function (config, analytics) {

        var wsUrl = config.wsUrl;
        
        function showProduct(product) {
            if (product.nameForUrl) {
                analytics.recordClick(_.extend(WS.AnalyticsEvents.ShowProduct, { Category: product.nameForUrl }));
                var productUri = encodeURI(wsUrl + (product.nameForUrl.indexOf("/") == 0 ? "" : "/") + product.nameForUrl);
                window.open(productUri, '_blank', 'location=yes');
            }
        };

        return {
            showProduct: showProduct
        };
    }];

})(_, Simple, WallaShops);