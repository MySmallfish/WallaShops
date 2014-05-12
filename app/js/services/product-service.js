(function (_, S, WS) {

    WS.ProductService = ["$q", "dailyCacheService", "wallaShopsApi", "$filter", function ($q, dailyCacheService, wallaShopsApi, $filter) {

        function getOtherInterestedPromotionsCategories() {

            return wallaShopsApi.getOtherInterestedPromotionsCategories().then(prepare);
        }

        function getBestSellersPromotionsCategories() {

            return wallaShopsApi.getBestSellersPromotionsCategories().then(prepare);
        }

        function getPromotionsCategories() {

            return wallaShopsApi.getPromotionsCategories().then(function(categories) {
                _.each(categories, function (category) {
                    if (category && category.products) {
                        category.products = prepare(category.products);
                    }
                });
                return categories;
            });
        }

        WS.RatingLineOptions = {
            Rating:0,
            SoldCount:1,
            Payments: 2
        };
        WS.DetailsLineOptions = {
            Details: 0,
            Discount: 1,
            Shipping: 2,
            GetPrice: 3,
            PersonalPrice: 4

        };

        function parseDetails(product) {
            var result = WS.DetailsLineOptions.Details;

            if (product.saleType == "Personal") {
                result = product.isDirectPrice ? WS.DetailsLineOptions.GetPrice : WS.DetailsLineOptions.PersonalPrice;
            }
            else if ((product.saleType == "DiscountAuction" || product.saleType == "GroupDeal") && !product.hideDiscount) {
                result = WS.DetailsLineOptions.Discount;
            }

            else if ((product.saleType == "DiscountAuction" || product.saleType == "GroupSale") && product.shippingMode !== 2 && product.shippingPrice === 0) {
                result = WS.DetailsLineOptions.Shipping;
            }
            return result;            
        }

        function parseRating(product) {
            var result = WS.RatingLineOptions.Rating;

            if (product.ratersNumber == 0) {
                if (product.saleType == 'DiscountAuction' || product.saleType == 'GroupDeal') {
                    result = WS.RatingLineOptions.SoldCount;
                } else {
                    result = WS.RatingLineOptions.Payments;
                }
            }

            return result;            
        }

        function detailsText(product) {
            switch (product.viewOptions.details) {
            case WS.DetailsLineOptions.Details:
                return "לפרטים";
            case WS.DetailsLineOptions.Discount:
                return "במקום " + $filter("number")(product.originalPrice, 0) + " ₪";
            case WS.DetailsLineOptions.Shipping:
                return "כולל משלוח";
            case WS.DetailsLineOptions.GetPrice:
                return "קבל מחיר";
            case WS.DetailsLineOptions.PersonalPrice:
                return "מחיר אישי";
            default:
            }
        }

        function getRatingUrl(rating) {
            var value = Math.ceil(rating);
            if (value > 0) {
                return "app/img/star" + String(value) + ".png";
            }
        }

        function prepare(products) {
            return _.map(products, function(product) {
                product.viewOptions = {
                    rating: parseRating(product),
                    showPrice: product.saleType !== 'Personal',
                    displayAveragePrice: product.saleType === 'Personal' && product.showAvgPrice,
                    details: parseDetails(product),
                    isDiscounted: (product.saleType == "DiscountAuction" || product.saleType == "GroupDeal") && !product.hideDiscount
                };
                product.detailsText = detailsText(product);
                if (product.viewOptions.rating === WS.RatingLineOptions.Rating) {
                    product.viewOptions.ratingImageUrl = getRatingUrl(product.rating);
                }
                return product;
            });
        }


        function search(parameters) {

            var result = $q.when({});

            if (parameters.searchTerm) {
                result = wallaShopsApi.getSearchProducts(parameters.searchTerm);
            } else {
                if (parameters.mainCategoryId) {
                    result = wallaShopsApi.getMainCategoryProducts(parameters);
                } else if (parameters.subCategoryId) {
                    result = wallaShopsApi.getSubCategoryProducts(parameters);
                } else if (parameters.subSubCategoryId) {
                    result = wallaShopsApi.getSubSubCategoryProducts(parameters);
                }
            }


            return result.then(prepare);
        }


        return {
            getOtherInterestedPromotionsCategories: getOtherInterestedPromotionsCategories,
            getBestSellersPromotionsCategories: getBestSellersPromotionsCategories,
            getPromotionsCategories: getPromotionsCategories,
            search: search
        };

    }];

})(_, Simple, WallaShops);