(function (_, S, WS) {

    var app = angular.module("WallaShops");
    app.config(["$routeProvider", function (provider) {
        
        provider
            .when("/Home", { templateUrl: "app/js/directives/categories-menu/categories-menu.html", controller: "CatMenuCtrl" })
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl" })
            .when("/Search", { templateUrl: "views/search.html", controller: "SearchCtrl" })
            .when("/Comparison", { templateUrl: "views/comparison.html", controller: "ComparisonCtrl" })
            .otherwise({ redirectTo: "/" });
    }]);

})(_, Simple, WallaShops);