(function (_, S, WS) {

    if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i)) {
        $('html').addClass('ipad ios7');
    }

    var app = angular.module("WallaShops", ["ngRoute", "ngTouch", "$strap"]);
    //app.run(function () {
    //    FastClick.attach(document.body);
    //});
    app.service("network", S.NetworkService);
    app.service("networkManager", S.NetworkManager);

    app.service("config", WS.Configuration);
    app.service("categoryService", WS.CategoryService);
    app.service("promotionsService", WS.PromotionsService);
    app.service("productService", WS.ProductService);
    app.service("dailyCacheService", WS.DailyCacheService);
    app.service("wallaShopsApi", WS.WallaShopsApi);
    app.service("externalBrowser", WS.ExternalBrowser);
    app.service("productDetailsPresenter", WS.ProductDetailsPresenter);
    app.service("safeApply", function ($rootScope) {
        return function ($scope, fn) {
            var phase = $scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn) {
                    $scope.$eval(fn);
                }
            } else {
                if (fn) {
                    $scope.$apply(fn);
                } else {
                    $scope.$apply();
                }
            }
        }
    });

    GoogleAnalyticsService = function (key) {
        ga_storage._setAccount(key);
        return function () {

            function isAvailable() {
                return true; // typeof ga !== "undefined";
            }

            function record(category, action, label) {

                if (isAvailable()) {
                    if (category.Category) {
                        label = category.Label;
                        category = category.Category;
                    }
                    //ga(onRecorded);
                    //ga("send", "event", category, action, label);
                    //_gaq.push(onRecorded);
                    //_gaq.push(["_trackEvent", category, action, label]);
                    ga_storage._trackEvent(category, action, label);
                }
            }

            function recordClick(category, label) {
                record(category, "Click", label);
            }

            return {
                isAvailable: isAvailable,
                record: record,
                recordClick: recordClick
            };
        };
    };
    var analyticsService = GoogleAnalyticsService('UA-48712169-1');
    app.service("analytics", analyticsService);
    app.directive("sOnline", ["network", function (network) {
        return {
            restrict: "A",
            link: function (scope) {
                scope.isOnline = network.isOnline();
                scope.$on("Simple.NetworkStatusChanged", function onNetworkStateChanged(args) {
                    console.log("NetworkStatusChange...", args.online);
                    scope.isOnline = args.online;
                });
            }
        };
    }]);

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

    app.directive("wsMark", function () {
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