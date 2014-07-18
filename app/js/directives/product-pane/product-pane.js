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
                            $("<img/>").appendTo(iconDiv);
                        } else {
                            iconDiv = iconDiv.clone();
                            $("div.discount-icon", iconDiv).hide();
                            iconDiv.appendTo(iconsContainer);
                        }

                        if (product.icons[i].imageUrl) {
                            $("img", iconDiv).attr("src", product.icons[i].imageUrl);
                        } else {
                            $("img", iconDiv).remove();
                        }

                        var discountIcon = $("div.discount-icon", iconDiv),
                            iconText = $("div.icon-text", discountIcon);
                        if (product.discountAmount ) {
                            if (discountIcon.length == 0) {
                                discountIcon = $("<div/>").addClass("discount-icon").appendTo(iconDiv);
                                iconText = $("<div/>").addClass("discount-icon-text").text(product.discountAmount || "").appendTo(discountIcon);
                                $("<div/>").text("הנחה").appendTo(discountIcon);
                            }
                            iconText.text(product.discountAmount || "");
                        } else {
                            discountIcon.remove();
                        }

                        if (iconDiv.children().length == 0) {
                            iconDiv.remove();
                        }
                    }

                    $("span.details-text", element).text(product.detailsText);
                    $("img.productImg", element).attr("src", product.imageUrl);
                    $("div.title", element).text(product.title);
                    
                    $("div.subtitle", element).text(product.subTitle);
                    var ratingDiv = $("div.rating", element);
                    if (product.viewOptions.rating == 0) {
                        $(".stars", ratingDiv).show();
                        $("img", ratingDiv).attr("src", product.viewOptions.ratingImageUrl);
                        $("span.raters-number", ratingDiv).text("(" + product.ratersNumber + ")");
                    }
                    if (product.viewOptions.rating) {
                        var text = "";
                        if (product.viewOptions.rating == 1 && product.buyersCount >0) {
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
                        priceDiv.empty().show();
                        
                        if (product.viewOptions.showPrice) {
                            $("<span/>").text("רק ").css("font-weight", "normal").appendTo(priceDiv);
                            priceDiv.css("font-weight", "bold").show();
                        } else {
                            priceDiv.addClass("average-price");
                        }
                        $("<span/>").text($filter("number")(product.viewOptions.displayAveragePrice ? product.averagePrice : product.price) + " ₪").appendTo(priceDiv);
                    } else {
                        priceDiv.hide();
                    }

                }
            }
        }
    }];

})(Simple, WallaShops);




