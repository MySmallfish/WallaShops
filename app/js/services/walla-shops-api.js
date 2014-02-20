(function (_, S, WS) {

    WS.WallaShopsApi = ["$http", "$q", "config", function ($http, $q, config) {

        var mainPromotions = [
            {
                promotion: "app/img/pic1.png",
                name: "promotion1",
                url: "http://www.wallashops.co.il/LandingPage?uid=47d897cd-d951-44e4-9766-24450e6ab9ee"
            },
            {
                promotion: "app/img/pic2.png",
                name: "promotion2",
                url: "http://www.wallashops.co.il/%D7%94%D7%9C%D7%91%D7%A9%D7%94-%D7%94%D7%A0%D7%A2%D7%9C%D7%94/%D7%97%D7%96%D7%99%D7%95%D7%AA-%D7%AA%D7%97%D7%AA%D7%95%D7%A0%D7%99%D7%9D#m=s&p=1&f=110390"

            },
            {
                promotion: "app/img/pic3.png",
                name: "promotion3",
                url: "http://www.wallashops.co.il/%D7%93%D7%99%D7%9C-%D7%99%D7%95%D7%9E%D7%99/%D7%97%D7%95%D7%A8%D7%A3-%D7%97%D7%9D/%D7%90%D7%95%D7%A4%D7%A0%D7%94-%D7%97%D7%95%D7%A8%D7%A4%D7%99%D7%AA"
            }
        ];

        var seasonalImages = [
            {
                "Id": 8098,
                "CategoryCode": 5000,
                "SystemId": 4,
                "LocationCode": 9200,
                "LayoutCode": 25,
                "FocusPriority": 0,
                "CategoryType": 0,
                "CategoryRefId": 0,
                "WSApiPromotionObjItem": null,
                "Values": [
                    {
                        "code": "image",
                        "URL": "http://test.wallashops.co.il/Promotions/0/11/8098_250x120.jpg",
                        "HeightPixel": 120,
                        "WidthPixel": 250
                    },
                    {
                        "code": "text",
                        "Text": "בק טו בלאק"
                    },
                    {
                        "code": "link",
                        "URL": "http://www.wallashops.co.il/landingpage.aspx?uid=a6aeae3d-b055-4826-9c5a-549d141a261d",
                        "Text": ""
                    }
                ]
            }
        ];

        //   [ {
        //        promotion: "app/img/pic4.png",
        //        name: "1",
        //        url:"http://www.wallashops.co.il/%D7%97%D7%91%D7%99%D7%9C%D7%AA-%D7%A0%D7%95%D7%A4%D7%A9-7-%D7%9C%D7%99%D7%9C%D7%95%D7%AA-%D7%9C%D7%A8%D7%95%D7%9E%D7%90-%D7%91%D7%90%D7%A4%D7%A8%D7%99%D7%9C/pi2SKuguyf"
        //    }
        //];

        var promotionsCategories = [{
            name: "לאן ללכת?",
            products: [
                { id: 1, title: "א. 1", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 1.5, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 2, title: "ג. 2", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 2.5, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 3, title: "ב. 3", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 3.5, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 4, title: "מכונת 4", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 4, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 5, title: "א. 5", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 5, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 6, title: "ג. 6", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 1, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 7, title: "ב. 7", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 2, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 8, title: "מכונת 8", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 3, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 9, title: "א. 9", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 4, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 10, title: "ג. 10", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 5, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 11, title: "ב. 11", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 1, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 12, title: "מכונת 12", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 2, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 13, title: "א. 13", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 3, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 14, title: "ג. 14", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 4, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 15, title: "ב. 15", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 5, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 16, title: "מכונת 16", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 1, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 17, title: "א. 17", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 2, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                { id: 18, title: "ג. 18", subtitle: "לגבר המטרוסקסואלי", subtitle2: "נרכשו", rating: 3, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
            ],
            id: 1
        },
           {
               name: "לאיזה מכירות כדאי לשים לב",
               products: [
                   { id: 1, title: "א. 21", subtitle: "לגבר המטרוסקסואלי", rating: 4, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                   { id: 2, title: "ג. 22", subtitle: "לגבר המטרוסקסואלי", rating: 5, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                   { id: 3, title: "ב. 23", subtitle: "לגבר המטרוסקסואלי", rating: 1, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                   { id: 4, title: "מכונת 24", subtitle: "לגבר המטרוסקסואלי", rating: 2, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                   { id: 4, title: "מכונת524", subtitle: "לגבר המטרוסקסואלי", rating: 3, ratersNumber: 20, icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" }
               ],
               id: 2
           }];

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
            return _.map(menuCategories, mapMenuCategory);
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


        function mapProducts(product) {
            var mappedProduct = {
                id: product.ProductID,
                title: product.TitleLine1,
                subTitle: product.TitleLine2,
                subtitle2: product.blabla,
                imageUrl: product.SmallPicPath,
                type: product.AuctionType,
                rating: product.ReviewsScore,
                ratersNumber: product.ReviewsCount,
                price: product.Price,
                coin: product.ProductCoin,
                nameForUrl: product.VirtualUrl,
                status: product.Status,
                icons: _.map(product.SaleSquareIcons, mapIcons)
            };

            return mappedProduct;
        }

        function mapIcons(icon) {
            var mappedProduct = {
                image: icon.ImagePath,
                link: icon.ImageLink,
                imageAlt: icon.ImageAlt
            };
            return mappedProduct;
        }

        function mapSearchProducts(products) {

            var mappedproducts = _.map(products, mapProducts);
            return mappedproducts;
        }

        function getMainCategoryProducts(parameters) {
            return getSearchPageProducts("maincat", parameters.mainCategoryId);
        }

        function getSubCategoryProducts(parameters) {
            return getSearchPageProducts("cat", parameters.subCategoryId);
        }

        function getSubSubCategoryProducts(parameters) {
            return getSearchPageProducts("cat", parameters.subSubCategoryId);
        }

        function getBrandProducts(parameters) {
            return run("auctions/brand", { id: parameters.id }).then(mapSearchProducts);
        }

        function getSearchProducts(searchTerm) {
            return run("auctions/search", { search: searchTerm }).then(mapSearchProducts);
        }

        function getSearchPageProducts(type, categoryId) {
            return run("auctions/" + type, { catid: categoryId }).then(mapSearchProducts);
        }

        function mapPromotionValues(value) {
            var mappedValue = {
                code: value.code,
                name: value.Text,
                promotion: value.ImagePath,
                url: value.URL,
                height: value.HeightPixel,
                Width: value.WidthPixel
            };
            return mappedValue;
        }

        function mapPromotions(mainPromotion) {
            var mappedSeasonalImage = {
                id: mainPromotion.Id,
                categoryCode: mainPromotion.CategoryCode,
                priority: mainPromotion.FocusPriority,
                location: mainPromotion.LocationCode,
                values: _.map(mainPromotion.Values, mapPromotionValues)

            };
            return mappedSeasonalImage;
        }

        function getMainPromotions() {

            var mappedPromotions = _.map(mainPromotions, mapPromotions);
            return mappedPromotions;

            //var result = $q.defer();

            //result.resolve(mainPromotions);

            //return result.promise;
        }

        function mapSeasonalImages(seasonalImage) {
            var mappedSeasonalImage = {
                id: seasonalImage.Id,
                location: seasonalImage.LocationCode,
                values: _.map(seasonalImage.Values, mapPromotionValues)
                
            };
            return mappedSeasonalImage;
        }

        function getSeasonalImages() {

            var mappedPromotions = _.map(seasonalImages, mapSeasonalImages);
            return mappedPromotions;

            //var result = $q.defer();

            //result.resolve(seasonalImages);

            //return result.promise;
        }

        function getPromotionsCategories() {

            var result = $q.defer();

            result.resolve(promotionsCategories);

            return result.promise;
        }


        return {
            getMenuCategories: getMenuCategories,
            mapCategoryFilters: mapCategoryFilters,
            getMainPromotions: getMainPromotions,
            getSeasonalImages: getSeasonalImages,
            getPromotionsCategories: getPromotionsCategories,
            getCategoryDetails: getCategoryDetails,
            getSearchProducts: getSearchProducts,
            getBrandProducts: getBrandProducts,
            getSubSubCategoryProducts: getSubSubCategoryProducts,
            getSubCategoryProducts: getSubCategoryProducts,
            getMainCategoryProducts: getMainCategoryProducts,
            mapCategoriesToFilters: mapCategoriesToFilters

        };

    }];

})(_, Simple, WallaShops);