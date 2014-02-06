(function (_, S, WS) {

    WS.CategoriesMenuTriggerDirective = [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/categories-menu-trigger.html',
            scope: false,
            replace: true,
            link: function (scope, element) {
                
                $(".category", element).click(function (event) {
                    isMenuOpen();
                    event.stopPropagation();
                    $(this).popover("toggle");
                    
                });

                $(".content-container").click(function () {
                    isMenuOpen();
                    $(".category", element).popover("hide");
                });

                scope.$on("WallaShops.FilterValueSelected", function(e, args) {
                    console.log("FilterValueSelected");
                    scope.isFiltered = true;
                });

                scope.$on(".WallaShops.publishCleared", function (e, args) {
                    console.log("publishCleared");
                    scope.isFiltered = false;
                });


                var isMenuOpen = function () {
                    if (scope.isMenuOpen) {
                        scope.isMenuOpen = false;
                    } else {
                        scope.isMenuOpen = true;
                    }
                    console.log("OPEN??", scope.isMenuOpen);
                };

                //scope.isFiltered = function() {
                //    return false;
                //};
            }
        };
    }];

})(_, Simple, WallaShops);