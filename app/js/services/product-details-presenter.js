(function (_, S, WS) {

    WS.ProductDetailsPresenter = ["externalBrowser", "analytics", function (externalBrowser, analytics) {

        
        
        function showProduct(product) {
            if (product.nameForUrl) {
                //analytics.recordClick(_.extend(WS.AnalyticsEvents.ShowProduct, { Category: product.nameForUrl }));
                var productUri = (product.nameForUrl.indexOf("/") == 0 ? "" : "/") + product.nameForUrl;
                externalBrowser.open(productUri);
            }
        };

        return {
            showProduct: showProduct
        };
    }];

})(_, Simple, WallaShops);