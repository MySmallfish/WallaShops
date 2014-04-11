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

    app.directive("setScroll", function() {
        return {
            restrict: "A",
            scope: false,
            link: function (scope, element) {
                var s = false;
                $(element).on("scroll", function () {
                    if (s) return;

                    var scrollLeft = element[0].scrollLeft;
                    scrollLeft = element[0].scrollWidth - element[0].clientWidth - scrollLeft;
                    console.log(element[0].clientWidth, scrollLeft);
                    scope.isScrollingRight = scrollLeft > 10;
                    scope.isScrollingLeft = element[0].clientWidth > scrollLeft + 50;
                    //console.log(scrollLeft, scrollLeft/, Math.floor(element[0].scrollWidth / Math.max(scrollLeft, 1)) * 230);
                    console.log(Math.floor(scrollLeft / 230) * 230);
                    var newScrollLeft = element[0].scrollLeft;
                    console.log(newScrollLeft);
                    if ((newScrollLeft/230) != Math.floor(newScrollLeft / 230)) {
                        newScrollLeft = Math.floor(newScrollLeft / 230) * 230;
                        setTimeout(function() {
                            element[0].scrollLeft = newScrollLeft;;
                        }, 250);

                    }
                    scope.$apply();
                    s = false;
                });
            }
        };
    });
    
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