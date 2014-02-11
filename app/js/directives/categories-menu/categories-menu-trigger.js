(function (_, S, WS) {

    WS.CategoriesMenuTriggerDirective = [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/categories-menu-trigger.html',
            scope: false,
            replace: true,
            link: function (scope, element) {

                function hide() {
                    triggerElement.popover("hide");
                    scope.isMenuOpen = false;
                    scope.$apply();
                }

                function show() {
                    triggerElement.popover("show");
                    scope.isMenuOpen = true;
                    scope.$apply();
                }

                var triggerElement = $(".category", element);
                triggerElement.click(function (event) {
                    event.stopPropagation();
                    if (scope.isMenuOpen) {
                        hide();
                    } else {
                        show();
                    }
                    
                });

                $(".content-container").click(function () {
                    hide();
                });

                scope.$on("WallaShops.FilterValueSelected", function(e, args) {
                    scope.isFiltered = true;
                });

                scope.$on("WallaShops.publishCleared", function (e, args) {
                    scope.isFiltered = false;
                });

            }
        };
    }];

})(_, Simple, WallaShops);