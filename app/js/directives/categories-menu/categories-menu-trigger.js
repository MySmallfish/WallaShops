(function (_, S, WS) {

    WS.CategoriesMenuTriggerDirective = [function () {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/categories-menu/categories-menu-trigger.html',
            scope: false,
            replace: true,
            link: function (scope, element) {
                
                $(".category", element).click(function (event) {
                    event.stopPropagation();
                    $(this).popover("toggle");
                });

                $(".content-container").click(function () {
                    $(".category", element).popover("hide");
                });

                scope.isFiltered = function() {
                    return true;
                };
            }
        };
    }];

})(_, Simple, WallaShops);