(function (S, WS) {

    WS.ProductPaneDirective = ["productDetailsPresenter", "$filter", "safeApply", function (productDetailsPresenter, $filter, safeApply) {
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

                function showProduct() {
                    productDetailsPresenter.showProduct(scope.product);
                }

                function check(event) {
                    
                    if (event) {
                        event.stopPropagation();
                    }
                    var target = $(this);
                    console.log(target, scope.canCheck , target.is(".checked"));
                    if (scope.canCheck || target.is(".checked")) {
                        target[(target.is(".checked") ? "remove" : "add") + "Class"]("checked");
                        scope.$emit("WallaShops.ProductChecked", { product: scope.product });
                        safeApply(scope);
                    }


                };

                function onProductDeleted(eventInfo, args) {
                    if (scope.product.id === args.product.id) {
                        check();
                    }
                }

                scope.$on("WallaShops.ProductDeleted", onProductDeleted);

                renderProduct(scope.product);

                function renderProduct(product) {
                    element.click(function() {
                        showProduct(product);
                    });
                    var checkBox = $(".check-box", element),
                        iconsContainer = $("div.icons", element), iconDiv;
                    if (scope.comparisonEnabled) {
                        checkBox.show();
                    } else {
                        checkBox.hide();
                    }
                    checkBox.click(check);

                    iconsContainer.empty();
                    for (var i = 0; i < product.icons.length; i++) {
                        if (!iconDiv) {
                            iconDiv = $("<div/>").addClass("image-icon").appendTo(iconsContainer);
                            $("<div/>").addClass("icon-text").hide().text(product.icons[i].discountAmount || "").appendTo( $("<div/>").addClass("discount-icon").appendTo(iconDiv));
                            $("<img/>").appendTo(iconDiv);
                        } else {
                            iconDiv = iconDiv.clone();
                            iconDiv.appendTo(iconsContainer);
                        }

                        $("img", iconDiv).attr("src", product.icons[i].imageUrl);
                        $("div.discount-icon", iconDiv)[product.icons[i].id ? "hide" : "show"]();
                    }

                    $("span.details-text", element).text(product.detailsText);
                    $("img.productImg", element).attr("src", product.imageUrl);
                    $("div.title", element).text(product.title);
                    
                    $("div.subtitle", element).text(product.subTitle);
                    var ratingDiv = $("div.rating", element);
                    if (product.viewOptions.rating == 0) {
                        $(".stars", ratingDiv).show();
                        $("img", ratingDiv).attr("src", product.viewOptions.ratingImageUrl);
                        $("span.raters-number", ratingDiv).text(product.ratersNumber);
                    }
                    if (product.viewOptions.rating) {
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
        }
    }];

})(Simple, WallaShops);




