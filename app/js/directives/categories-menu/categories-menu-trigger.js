(function (_, S, WS) {

    WS.CategoriesMenuTriggerDirective = ["config", "safeApply", function (config, safeApply) {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/categories-menu-trigger.html',
            scope: false,
            replace: true,
            link: function (scope, element) {
                //scope.popOverOptions = {
                //    animation: false,

                //};
                var autoCloseAtLevel = config.autoCloseAtLevel;

                function hide() {
                    $(".popover").css("display", "none");
                    triggerElement.popover("hide");
                    scope.isMenuOpen = false;
                    if (!scope.$root.$$phase) {
                        scope.$apply();
                    }
                }

                function show() {
                    triggerElement.popover("show");
                    scope.isMenuOpen = true;
                    if (!scope.$root.$$phase) {
                        scope.$apply();
                    }
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


                scope.$on("WallaShops.CategorySelected", function (eventInfo, args) {
                    
                    //console.log("on", scope, eventInfo, args);

                    var level = args.category.level;
                    if (autoCloseAtLevel != 0 && level >= autoCloseAtLevel) {
                        hide();
                    }
                });

                scope.$on("WallaShops.FilterValueSelected", function(e, args) {
                    scope.isFiltered = true;
                    hide();
                });

                scope.$on("WallaShops.publishCleared", function (e, args) {
                    scope.isFiltered = false;
                });

            }
        };
    }];

})(_, Simple, WallaShops);