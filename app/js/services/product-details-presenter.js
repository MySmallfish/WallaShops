(function (_, S, WS) {

    WS.ProductDetailsPresenter = ["config", function (config) {

        var wsUrl = config.wsUrl;
        
        function showProduct(product) {
            window.open(wsUrl + "/" + product.nameForUrl, "_blank");
        };

        return {
            showProduct: showProduct
        }
    }];

})(_, Simple, WallaShops);