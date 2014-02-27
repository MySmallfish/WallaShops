(function (_, S, WS) {

    WS.ProductDetailsPresenter = ["config", function (config) {

        var wsUrl = config.wsUrl;
        
        function showProduct(product) {
var productUri = encodeURI(wsUrl + (product.nameForUrl.indexOf("/") == 0 ? "" :"/") + product.nameForUrl);
            window.open(productUri, "_blank");
        };

        return {
            showProduct: showProduct
        }
    }];

})(_, Simple, WallaShops);