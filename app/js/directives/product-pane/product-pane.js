(function (S, WS) {

    WS.ProductPaneDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/product-pane/product-pane.html',
        scope: {
            product: "=",
            selectionMode: "=",
            selectedItems: "=",
            maxSelection: "@",
            isCompared: "=",
            isCheckedToCompare: "&"
            
        },
        replace: true,
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...            
            scope.stars = [0, 1, 2, 3, 4];
            scope.isDecimal = function (number) {
                return number > parseInt(number, 10);
            };
            scope.asInt = function (number) {
                return parseInt(number, 10);
            };

            scope.check = function ($event) {
                $event.stopPropagation();

                if (scope.checked) {
                    scope.selectedItems.splice(scope.selectedItems.indexOf(scope.product), 1);
                    scope.checked = false;
                } else {
                    if (scope.selectedItems.length != scope.asInt(scope.maxSelection)) {
                        scope.checked = true;
                        scope.selectedItems.push(scope.product);
                    }
                }
            };

            scope.publishRemoveProduct = function () {
                scope.$root.$broadcast("WallaShops.ProductDeleted", { product: scope.product });
            };

            function isChecked() {
                if (scope.isCheckedToCompare(scope.product)) {
                    scope.checked = true;
                }
            }

            isChecked();
        }
    };

})(Simple, WallaShops);




