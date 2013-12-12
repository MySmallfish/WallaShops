(function (_, S, WS) {

    var app = angular.module("WallaShops");
    app.config(function ($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl" })
            .when("/Search", { templateUrl: "views/search.html", controller: "SearchCtrl" })
            .when("/Comparison", { templateUrl: "views/comparison.html", controller: "ComparisonCtrl" })
            .otherwise({ redirectTo: "/" });
    });

})(_, Simple, WallaShops);