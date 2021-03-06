﻿(function (_, S, WS) {

    var app = angular.module("WallaShops");
    app.config(["$routeProvider", function (provider) {
        
        provider
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl" })
            .when("/Search", { templateUrl: "views/search.html", controller: "SearchCtrl" })
            .when("/Category", { templateUrl: "views/category.html", controller: "CategoryCtrl" })
            .when("/Comparison", { templateUrl: "views/comparison.html", controller: "ComparisonCtrl" })
            .otherwise({ redirectTo: "/" });
    }]);

})(_, Simple, WallaShops);
