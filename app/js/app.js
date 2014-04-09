(function (_, S, WS) {

    var app = angular.module("WallaShops", ["ngRoute", "ngTouch", "$strap", "Simple"]);
    app.run(function () {
        FastClick.attach(document.body);
    });
    app.service("config", WS.Configuration);
    app.service("categoryService", WS.CategoryService);
    app.service("promotionsService", WS.PromotionsService);
    app.service("productService", WS.ProductService);
    app.service("dailyCacheService", WS.DailyCacheService);
    app.service("wallaShopsApi", WS.WallaShopsApi);
    app.service("externalBrowser", WS.ExternalBrowser);
    app.service("productDetailsPresenter", WS.ProductDetailsPresenter);
    
    
    var analyticsService = S.GoogleAnalyticsService('UA-48712169-1');
    app.service("analytics", analyticsService);

    app.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|cdvfile):/);
    }]);

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
    app.directive("wsCategoriesMenuTrigger", WS.CategoriesMenuTriggerDirective);
    app.directive("wsCategories", WS.CategoriesDirective);
    app.directive("wsFilter", WS.FilterDirective);
    
    app.controller("HomeCtrl", WS.HomeController);
    app.controller("CatMenuCtrl", WS.CategoriesMenuController);
    app.controller("SearchCtrl", WS.SearchController);
    app.controller("ComparisonCtrl", WS.ComparisonController);
    app.controller("AppCtrl", WS.AppController);

    app.animation('.slide-animation', function() {
        return {
            beforeAddClass: function(element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if (scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, { left: finishPoint, onComplete: done });
                } else {
                    done();
                }
            },
            removeClass: function(element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if (scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, { left: 0, onComplete: done });
                } else {
                    done();
                }
            }
        };
    });

})(_, Simple, WallaShops);