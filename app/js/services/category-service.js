(function (_, S, WS) {

    WS.CategoryService = ["$q", "dailyCacheService", "wallaShopsApi", function ($q, dailyCacheService, wallaShopsApi) {


        function getCategories() {

            var menuCategories = dailyCacheService.get("menuCategories");
            var result;
            if (menuCategories) {
                result = $q.when(menuCategories);
            } else {

                var apiMenuCategories = wallaShopsApi.getMenuCategories();

                result = $q.when(apiMenuCategories).then(function (items) {
                    dailyCacheService.store("menuCategories", items);

                    return items;
                });
            }

            return result;
        }



        function getCategoryDetails(mainCategoryId, subCategoryId) {
            console.log("GET CATEGORY DETAILS");
            var result = $q.defer();
            result.resolve({
                Filters: [
        {
            "FilterLocation": 1,
            "FilterType": 1,
            "GroupName": "מותגים",
            "AdditionalGroupName": "מותגים נוספים",
            "FilterItems": [
              {
                  "Location": 1,
                  "FilterId": 95192,
                  "FilterName": "PANASONIC",
                  "Media": "/mall_site_images/mutags/PANASONIC.gif",
                  "HelpSubject": "",
                  "FilterVirtualName": "PANASONIC",
                  "ParentFilterKey": 1,
                  "FilterLink": "PANASONIC____f"
              },
              {
                  "Location": 2,
                  "FilterId": 95193,
                  "FilterName": "LG",
                  "Media": "/mall_site_images/mutags/LG.gif",
                  "HelpSubject": "",
                  "FilterVirtualName": "LG",
                  "ParentFilterKey": 1,
                  "FilterLink": "LG____f"
              },
              {
                  "Location": 3,
                  "FilterId": 95194,
                  "FilterName": "SAMSUNG",
                  "Media": "/mall_site_images/mutags/SAMSUNG.gif",
                  "HelpSubject": "",
                  "FilterVirtualName": "SAMSUNG",
                  "ParentFilterKey": 1,
                  "FilterLink": "SAMSUNG____f"
              }
            ]
        },
        {
            "FilterLocation": 2,
            "FilterType": 3,
            "GroupName": "גודל מסך",
            "AdditionalGroupName": "ערכים נוספים",
            "FilterItems": [
              {
                  "Location": 2,
                  "FilterId": 95266,
                  "FilterName": "43 \"",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "43-",
                  "ParentFilterKey": 2,
                  "FilterLink": "_43-___f"
              },
              {
                  "Location": 4,
                  "FilterId": 95263,
                  "FilterName": "50 \"",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "50-",
                  "ParentFilterKey": 2,
                  "FilterLink": "_50-___f"
              },
              {
                  "Location": 5,
                  "FilterId": 95264,
                  "FilterName": "51 \"",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "51-",
                  "ParentFilterKey": 2,
                  "FilterLink": "_51-___f"
              },
              {
                  "Location": 7,
                  "FilterId": 95265,
                  "FilterName": "60 \"",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "60-",
                  "ParentFilterKey": 2,
                  "FilterLink": "_60-___f"
              },
              {
                  "Location": 8,
                  "FilterId": 95268,
                  "FilterName": "64 \"",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "64-",
                  "ParentFilterKey": 2,
                  "FilterLink": "_64-___f"
              }
            ]
        },
        {
            "FilterLocation": 3,
            "FilterType": 3,
            "GroupName": "תמיכה ב-HD",
            "AdditionalGroupName": "ערכים נוספים",
            "FilterItems": [
              {
                  "Location": 1,
                  "FilterId": 95271,
                  "FilterName": "Full HD",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "Full-HD",
                  "ParentFilterKey": 3,
                  "FilterLink": "__Full-HD__f"
              },
              {
                  "Location": 2,
                  "FilterId": 95270,
                  "FilterName": "HD Ready",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "HD-Ready",
                  "ParentFilterKey": 3,
                  "FilterLink": "__HD-Ready__f"
              }
            ]
        },
        {
            "FilterLocation": 4,
            "FilterType": 3,
            "GroupName": "טכנולוגייה",
            "AdditionalGroupName": "ערכים נוספים",
            "FilterItems": [
              {
                  "Location": 1,
                  "FilterId": 95272,
                  "FilterName": "Smart TV 3D",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "Smart-TV-3D",
                  "ParentFilterKey": 4,
                  "FilterLink": "___Smart-TV-3D_f"
              },
              {
                  "Location": 2,
                  "FilterId": 95273,
                  "FilterName": "Smart TV",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "Smart-TV",
                  "ParentFilterKey": 4,
                  "FilterLink": "___Smart-TV_f"
              },
              {
                  "Location": 3,
                  "FilterId": 95274,
                  "FilterName": "תלת מימד 3D",
                  "Media": "",
                  "HelpSubject": "",
                  "FilterVirtualName": "תלת-מימד-3D",
                  "ParentFilterKey": 4,
                  "FilterLink": "___תלת-מימד-3D_f"
              }
            ]
        }
                ]
            });
            return result.promise;
        }

        function getFilters(category) {
            
            var categories = dailyCacheService.get("categories");
            var result=$q.when([]);

            if (category && categories) {
                console.log("getFilters");

                if (typeof category.filters !== "undefined") {
                    result = $q.when(category.filters);
                } else {
                    var mainCategoryId, subCategoryId = null;
                    if (category.parent) {
                        mainCategoryId = category.parent.id;
                        subCategoryId = category.id;
                    } else {
                        mainCategoryId = category.id;
                    }

                    result = getCategoryDetails(mainCategoryId, subCategoryId).then(function (fullApiCategory) {
                        category.filters = fullApiCategory.Filters;
                        return category.filters;
                    });
                }
            }
            return result;
        }

        return {
            getCategories: getCategories,
            getFilters: getFilters
        };

    }];

})(_, Simple, WallaShops);