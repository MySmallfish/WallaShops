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

                var product = scope.product;
                $("span.details-text", element).text(product.detailsText);
                $("img.productImg", element).attr("src", product.imageUrl);
                $("div.title", element).text(product.title);
                $("div.subTitle", element).text(product.subTitle);
                var ratingDiv = $("div.rating", element);
                if (product.viewOptions.rating == 0){
                    $(".stars", ratingDiv).show();
                    $("img", ratingDiv).attr("src", product.viewOptions.ratingImageUrl);
                    $("span.raters-number", ratingDiv).text(product.ratersNumber);
                }
                if (product.viewOptions.rating ) {
                    var text = "";
                    if (product.viewOptions.rating == 1) {
                        text = "נרכשו: " + String(product.buyersCount);
                    } else if (product.viewOptions.rating == 2) {
                        text = "מס' תשלומים: " + String(product.paymentsNum);
                    }
                    ratingDiv.text(text);
                    if (product.viewOptions.rating == 2 && product.paymentsNum < 36) {
                        $("<span/>").addClass("payments").appendTo(ratingDiv);
                    }
                }



                var priceDiv = $("div.price", element);
                if (product.viewOptions.showPrice || product.viewOptions.displayAveragePrice) {
                    priceDiv.show();
                    if (product.viewOptions.showPrice) {
                        $("<span/>").text("רק ").css("font-weight", "normal").appendTo(priceDiv);
                        priceDiv.css("font-weight", "bold");
                    } else {
                        priceDiv.addClass("average-price");
                    }
                    priceDiv.text($filter("number")(product.viewOptions.displayAveragePrice ? product.averagePrice : product.price) + " ₪");
                }

                
            }
        }
    }];

})(Simple, WallaShops);




