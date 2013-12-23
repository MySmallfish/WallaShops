(function (_, S, WS) {

    var app = angular.module("WallaShops", ["ngRoute", "ngTouch", "Simple"]);
    
    app.directive("appHeader", function () {
        return WS.AppHeaderDirective;
    });
    app.directive("productPane", function () {
        return WS.ProductPaneDirective;
    });
    app.directive("productsList", function () {
        return WS.ProductsListDirective;
    });
    app.directive("productsListNavigation", function () {
        return WS.ProductsListNavigationDirective;
    });
    app.directive("productsListItems", function () {
        return WS.ProductsListItemsDirective;
    });
    
    

    app.controller("HomeCtrl", WS.HomeController);
    app.controller("SearchCtrl", WS.SearchController);
    app.controller("ComparisonCtrl", WS.ComparisonController);
    app.controller("AppCtrl", WS.AppController);

})(_, Simple, WallaShops);