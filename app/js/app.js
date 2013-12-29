(function (_, S, WS) {

    var app = angular.module("WallaShops", ["ngRoute", "ngTouch", "Simple"]);

    app.service("categoryService", WS.CategoryService);
    
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
    app.directive("wsCategoriesMenu", WS.CategoriesMenuDirective);

    
    
   
    
    app.controller("HomeCtrl", WS.HomeController);
    app.controller("CatMenuCtrl", WS.CategoriesMenuController);
    app.controller("SearchCtrl", WS.SearchController);
    app.controller("ComparisonCtrl", WS.ComparisonController);
    app.controller("AppCtrl", WS.AppController);

})(_, Simple, WallaShops);