(function (S, WS) {

    WS.ProductPaneDirective = ["productDetailsPresenter","$filter", function (productDetailsPresenter, $filter) {
        return {
            restrict: 'E',
            templateUrl: 'app/js/directives/product-pane/product-pane.html',
            scope: {
                product: "=",
                comparisonEnabled: "=",
                canCheck: "="
            },
            replace: true,
            link: function (scope, element, attributes, ctrl) {
                scope.showProduct = function () {
                    productDetailsPresenter.showProduct(scope.product);
                }
                scope.check = function ($event) {
                    if ($event) {
                        $event.stopPropagation();
                    }
                    if (scope.canCheck || scope.checked) {
                        scope.checked = !scope.checked;

                        scope.$emit("WallaShops.ProductChecked", { product: scope.product });
                    }
                };

                function onProductDeleted(eventInfo, args) {
                    if (scope.product.id === args.product.id) {
                        scope.check();
                    }
                }

                scope.$on("WallaShops.ProductDeleted", onProductDeleted);
            }
        }
    }];

})(Simple, WallaShops);




