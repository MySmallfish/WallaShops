(function (_, S, WS) {

    if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
        $('html').addClass('ipad ios7');
    }

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

    //app.directive("setScroll", ["safeApply", function(safeApply) {
    //    return {
    //        restrict: "A",
    //        scope: false,
    //        link: function (scope, element) {
    //            function updateScrolling() {
    //                var scrollLeft = element[0].scrollLeft;
    //                scrollLeft = element[0].scrollWidth - element[0].clientWidth - scrollLeft;
    //                scope.isScrollingRight = scrollLeft > 10;
    //                scope.isScrollingLeft = element[0].scrollLeft > 40;

    //                safeApply(scope);
    //            }

    //            $(element).on("scroll", updateScrolling);

    //            updateScrolling();
    //        }
    //    };
    //}]);
    
    var analyticsService = S.GoogleAnalyticsService('UA-48712169-1');
    app.service("analytics", analyticsService);

    app.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|cdvfile):/);
    }]);

    app.directive("wsLoading", function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="loading" ><div class="message">אנו אוספים נתונים עבורך, אנא המתן/י</div></div>'
        };
    });

    app.directive("wsMark", function() {
        return {
            restrict: "A",
            link: function (scope, element, attr) {

                element.on("mousedown", function () {
                    element.addClass("ng-click-active");
                });
                element.on("mouseup", function () {
                    element.removeClass("ng-click-active");
                });

            }
        }
    });

    app.directive("appHeader", function () {
        return WS.AppHeaderDirective;
    });
    app.directive("productPane", WS.ProductPaneDirective);
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

    
})(_, Simple, WallaShops);