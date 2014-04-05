(function (S) {

    var wsModule = angular.module("WallaShops");
    wsModule.run(function (textResource) {
        textResource.load("he-IL", {
            "Key": "value",
            "MainBreadCramb":"ראשי"
        });

    });

})(Simple);