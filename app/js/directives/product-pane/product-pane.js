(function (S, WS) {

    WS.ProductPaneDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/product-pane/product-pane.html',
        scope: {
            product: "=",
            selectedItems: "=",
            comparisonEnabled: "=",
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

            function isChecked() {
                if (scope.isCheckedToCompare(scope.product)) {
                    scope.checked = true;
                }
            }

            scope.setRatingLine = function (product) {
                var result = "rating";

                if (product.ratersNumber == 0) {
                    if (product.saleType == 'DiscountAuction' || product.saleType == 'GroupDeal') {
                        result = "soldCount";
                    } else {
                        result = "payments";
                    }
                }

                return result;
            };

            scope.setDetailsLine = function (product) {
                var result = "details";

                if (product.saleType == "Personal") {
                    result = product.isDirectPrice ? "getPrice" : "personalPrice";
                }
                else if ((product.saleType == "DiscountAuction" || product.saleType == "GroupDeal") && !product.hideDiscount) {
                    result = "discount";
                }

                else if ((product.saleType == "DiscountAuction" || product.saleType == "GroupSale") && product.shippingMode !== 2 && product.shippingPrice === 0) {
                    result = "shipping";
                }
                return result;
            };
            
            function mapIcon(icon) {

                var mappedIcon = {
                    id: icon.id,
                    imageAlt: icon.imageAlt
                };

                if (icon.id === 2) {
                    if (scope.product.shippingTime === 2) {
                        mappedIcon.imageUrl = icon.imageUrl2;
                    } else {
                        mappedIcon.imageUrl = icon.imageUrl1;
                    }
                }

                else{
                    mappedIcon.imageUrl = icon.imageUrl;
                    mappedIcon.imageAlt = icon.imageAlt;
                }
                return mappedIcon;
            }
            
            function onProductDeleted(eventInfo, args) {
                console.log("remove", scope.checked);
                
                if (scope.product.id === args.product.id) {
                    scope.checked = false;
                }
            }

            scope.$on("WallaShops.ProductDeleted", onProductDeleted);

            scope.product.icons = _.map(scope.product.icons, mapIcon);
            isChecked();
        }
    };

})(Simple, WallaShops);




