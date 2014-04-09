(function (_, S, WS) {

    WS.WallaShopsApi = ["$http", "$q", "config", function ($http, $q, config) {

        var baseUrl = config.baseUrl;

        function run(url, parameters) {
            return $http({
                url: [baseUrl, "api", url].join("/"),
                method: "GET",
                params: parameters
            }).then(function (result) {
                return result.data;
            });
        }

        function mapMenuCategory(category, parent) {
            var mappedCategory = {
                id: category.ID,
                title: category.MenuName,
                menuType: category.MenuType,   /*1-title only 2-external link 3-category*/
                mainCategoryId: category.MainCategoryID,
                subCategoryId: category.SubCategoryID,
                icon: category.MenuIconPath,
                isNewWindow: category.IsNewWindow,
                link: category.MenuLink,
                level: parent && typeof parent.level == "number" ? parent.level + 1 : 0,
                parent: parent
            };

            var ex = _.clone(mappedCategory);
            mappedCategory.categories = _.map(category.Menus, function (subCategory) {
                return mapMenuCategory(subCategory, ex);
            });
            return mappedCategory;
        }

        function mapMenuCategories(menuCategories) {
            return _.map(menuCategories, function (item, index) { return mapMenuCategory(item); });
        }

        function getCategoryDetails(mainCategoryId, subCategoryId) {
            return run("categories/GetCategoryInfoById", { mainCategoryId: mainCategoryId, categoryId: subCategoryId });
        }

        function getMenuCategories() {
            return run("menu/GetMenus", { menuType: 2 }).then(mapMenuCategories);
        }

        function mapFilter(filter) {
            var mappedFilter = {
                title: filter.GroupName,
                location: filter.FilterLocation,
                type: filter.FilterType,
                additionalName: filter.AdditionalGroupName,
                values: _.map(filter.FilterItems, mapFilterItem)
            };

            return mappedFilter;
        }

        function mapFilterItem(filterItem) {
            var mappedFilterItem = {
                id: filterItem.FilterId,
                title: filterItem.FilterName,
                image: filterItem.Media,
                location: filterItem.Location,
                nameForUrl: filterItem.FilterVirtualName,
                parent: filterItem.ParentFilterKey,
                link: filterItem.FilterLink
            };
            return mappedFilterItem;
        }

        function mapCategoryFilters(filters) {

            var mappedfilters = _.map(filters, mapFilter);

            return mappedfilters;
        }

        function mapSubSubSubCategories(category) {
            var mappedFilterItem = {
                id: category.CategoryID,
                title: category.MenuName,
                nameForUrl: category.VirtualUrl,
                link: category.CategoryLink
            };
            return mappedFilterItem;
        }

        function mapCategoriesToFilters(mainCategory) {

            var mappedFilter = {
                title: mainCategory.MenuName,
                values: _.map(mainCategory.ChildCategories, mapSubSubSubCategories)
            };

            return mappedFilter;
        }

        function mapIcon(icon) {
            var mappedIcon = {
                id: icon
            };
            
            if (icon === 2) {
                mappedIcon.imageUrl1 = baseUrl + "/images/Auctions/CubeIcons/OrderGetTodayIcon.png";
                mappedIcon.imageUrl2 = baseUrl + "/images/Auctions/CubeIcons/OrderGetTomorrowIcon.png";
                mappedIcon.imageAlt = "הספקה מהירה";
            }
            
            if (icon === 3) {
                mappedIcon.imageUrl = icon.saleSquareIcons.ImagePath;
                mappedIcon.imageAlt = icon.saleSquareIcons.ImageAlt;
                mappedIcon.link = icon.ImageLink;
            }

            else if (icon === 4) {
                mappedIcon.imageUrl = baseUrl + "/Images/Auctions/CubeIcons/free_delivery.png";
                mappedIcon.imageAlt = "free delivery";
            }
            
            else if (icon === 5) {
                mappedIcon.imageUrl = baseUrl + "/images/Auctions/CubeIcons/PaymentsSaleIcon.png";
                mappedIcon.imageAlt = "36 תשלומים ללא ריבית";
            }
            
            return mappedIcon;
        }

        function mapProduct(product) {
            var mappedProduct = {
                id: product.ProductID,
                title: product.TitleLine1,
                subTitle: product.TitleLine2,
                saleType: product.AuctionType,
                imageUrl: product.AuctionType == "DiscountAuction" || product.AuctionType == "GroupDeal" ? product.SmallPicPathGroupDeal : product.SmallPicPath,
                rating: product.ReviewsScore,
                ratersNumber: product.ReviewsCount,
                paymentsNum: product.PaymentsNum,
                buyersCount: product.SoldCount,
                minBuyersCount: 2, //product.MinSoldCount
                remainCount: product.RemainCount,
                price: product.Price,
                coin: product.ProductCoin, //2 = ILS, 3 = USD, 4 = USD, 11 = EURO
                originalPrice: product.OriginalPrice,
                area: product.GroupDealArea,
                brandName: product.BrandName,
                nameForUrl: product.VirtualUrl,
                status: product.Status,
                isActive: product.IsActive,
                shippingTime: product.ShippingTime,
                shippingMode: product.ShippingMode,
                shippingPrice: product.ShippingPrice,
                hideDiscount: product.HideDiscount ? product.HideDiscount : false,
                discountAmount: product.DiscountAmount,
                isDirectPrice: product.IsPersonalAuctionDirectPrice,
                showAvgPrice: product.ShowApproxAvgZap,
                saleSquareIcons:product.SaleSquareIcons,
                icons: _.map(product.CubeIconTypes, mapIcon)
            };

            if (mappedProduct.imageUrl) {
                var img = new Image();
                img.src = mappedProduct.imageUrl;
            }
            
            
            return mappedProduct;
        }

        function mapSearchProducts(products, innerObject) {

            var mappedproducts = _.map(products, function(product) {
                if (innerObject) {
                    return mapProduct(product[innerObject]);
                } else {
                    return mapProduct(product);
                }
            });
            return mappedproducts;
        }

        function getMainCategoryProducts(parameters) {
            return getSearchPageProducts("maincat", parameters.mainCategoryId, parameters.filters);
        }

        function getSubCategoryProducts(parameters) {
            return getSearchPageProducts("cat", parameters.subCategoryId, parameters.filters);
        }

        function getSubSubCategoryProducts(parameters) {
            return getSearchPageProducts("cat", parameters.subSubCategoryId, parameters.filters);
        }

        function getBrandProducts(parameters) {
            return run("auctions/brand", { id: parameters.id }).then(mapSearchProducts);
        }

        function getSearchProducts(searchTerm) {
            return run("auctions/search", { search: searchTerm }).then(function (results) {
                return results.Items;
            }).then(mapSearchProducts);
        }

        function getSearchPageProducts(type, categoryId, filters) {
            var parameters = { catid: categoryId };
            if (filters) {
                parameters.filterOptions = 1;
                parameters.filters = filters.join(",");
            }
            return run("auctions/" + type, parameters).then(mapSearchProducts);
        }


        function mapPromotions(promotions) {
            return _.map(promotions, function (promotion) {
                var mappedPromotions = {
                    id: promotion.Id,
                    categoryCode: promotion.CategoryCode,
                    priority: promotion.FocusPriority,
                    location: promotion.LocationCode
                };
                _.each(promotion.Values, function (value) {
                    mappedPromotions[value.code] = {
                        url: value.URL,
                        text: value.Text,
                        height: value.HeightPixel,
                        width: value.WidthPixel
                    };
                });
                return mappedPromotions;
            });
        }

        function getMainPromotions() {
            return run("promotions/GetPromotionItems", { locationCode: 5031 }).then(mapPromotions);
        }

        function getTopSeasonalImages() {
            return run("promotions/GetPromotionItems", { locationCode: 9100 }).then(mapPromotions);
        }

        function getBottomSeasonalImages() {
            return run("promotions/GetPromotionItems", { locationCode: 9200 }).then(mapPromotions);
        }

        function getOtherInterestedPromotionsCategories() {
            return run("Auctions/AuctionsMostViewed").then(mapSearchProducts);
        }

        function getBestSellersPromotionsCategories() {
            return run("Auctions/AuctionsMostSold").then(mapSearchProducts);
        }

        function getPromotionsCategories() {
            var categories = _.map(_.range(1,3), function(i) {
                return {
                    titleCode: 5060 + i,
                    productsCode: 5070 + i
                };
            });

            var promises = _.map(categories, function (category) {
                function mapResult(arr) {
                    if (arr[0].length) {
                        return {
                            name: arr[0][0].Values[0].Text,
                            products: mapSearchProducts(arr[1], "WSApiPromotionObjItem")
                        };
                    } else {
                        return null;
                    }
                }

                return $q.all([
                    run("promotions/GetPromotionItems", { locationCode: category.titleCode }),
                    run("promotions/GetPromotionItems", { locationCode: category.productsCode })
                ]).then(mapResult);
            });

            return $q.all(promises).then(function(items) {
                return _.filter(items, function (i) {
                    return i != null;
                });
            });
            
        }

        function mapFeatures(products) {
            var groups = {};

            _.each(products, function (product) {
                _.each(product.SpecGroups, function (specGroup) {
                    var group = groups[specGroup.Name] = groups[specGroup.Name] || {};
                    group.name = specGroup.Name;
                    group.order = specGroup.GroupOrder;
                    group.features = group.features || {};

                    _.each(specGroup.Attributes, function (attribute) {
                        var attr = group.features[attribute.Name] = group.features[attribute.Name] || { header: attribute.Name };
                        attr.values = attr.values || {};
                        attr.values[product.Pfid] = attribute.Value;
                    });

                });
            });

            var features = [];

            _.each(groups, function (group) {
                _.each(group.features, function (feature) {
                    feature = _.extend(feature, {
                        order: group.order,
                        name: group.name
                    });
                    features.push(feature);
                });
            });

            return features;
        }

        function filterFeatures(features) {
            var featuresNotForTable = ["סוג מכירה", "מחיר", "מספר מדרגים", "shpDays", "תקנון הספקה"];

            var filteredFeatures = _.filter(features, function (feature) {
                return !_.some(featuresNotForTable, function (item) {

                    return item === feature.header;
                });
            });
            return filteredFeatures;
        };

        function getFeaturesToComparison(productsIds) {
            return run("auctions/ProductsCompare", { PfIds: productsIds.join(",") }).then(mapFeatures).then(filterFeatures);
        }



        return {
            getMenuCategories: getMenuCategories,
            mapCategoryFilters: mapCategoryFilters,
            getMainPromotions: getMainPromotions,
            getTopSeasonalImages: getTopSeasonalImages,
            getBottomSeasonalImages: getBottomSeasonalImages,
            getOtherInterestedPromotionsCategories: getOtherInterestedPromotionsCategories,
            getBestSellersPromotionsCategories: getBestSellersPromotionsCategories,
            getPromotionsCategories: getPromotionsCategories,
            getCategoryDetails: getCategoryDetails,
            getSearchProducts: getSearchProducts,
            getBrandProducts: getBrandProducts,
            getSubSubCategoryProducts: getSubSubCategoryProducts,
            getSubCategoryProducts: getSubCategoryProducts,
            getMainCategoryProducts: getMainCategoryProducts,
            mapCategoriesToFilters: mapCategoriesToFilters,
            getFeaturesToComparison: getFeaturesToComparison

        };

    }];

})(_, Simple, WallaShops);