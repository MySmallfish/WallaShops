(function (_, S, WS) {

    WS.CategoryService = ["$q", function ($q) {

        function getCategories() {

            var result = $q.defer();
            var categories = [
                {
                    id: 1,
                    title: "קטגוריה 1",
                    level: 0,
                    categories: [
                        {
                            parentId: 1,
                            id: 4,
                            title: "קטגורית משנה  11",
                            level: 1,
                            categories: [
                                { id: 5, title: "קטגוריית משנה 2", level: 2 },
                                { id: 6, title: "קטגוריית משנה 3", level: 2 },
                                { id: 7, title: "קטגוריית משנה 4", level: 2 },
                                { id: 8, title: "קטגוריית משנה 5", level: 2 },
                                { id: 9, title: "קטגוריית משנה 6", level: 2 }
                            ]
                        },
                        {
                            parentId: 1,
                            id: 9,
                            title: "קטגורית משנה 11",
                            level: 1,
                            categories: [
                                { id: 10, title: "קטגוריית משנה 2", level: 2 }
                            ]
                        },
                        {
                            id: 30,
                            title: "google",
                            extarnalLink: { url: "http://www.google.com" }
                        }
                    ]
                },
                {
                    id: 2,
                    title: "עוד קטגוריה",
                    level: 0,
                    categories: [
                        {
                            parentId: 2,
                            id: 11,
                            title: "קטגורית משנה 2",
                            level: 1,
                            categories: [
                                { id: 12, title: "קטגוריית משנה 2", level: 2 },
                                { id: 13, title: "קטגוריית משנה 3", level: 2 },
                                { id: 14, title: "קטגוריית משנה 4", level: 2 },
                                { id: 15, title: "קטגוריית משנה 5", level: 2 },
                                { id: 16, title: "קטגוריית משנה 6", level: 2 }
                            ]
                        },
                        {
                            parentId: 2,
                            id: 9,
                            title: "קטגורית משנה 2",
                            level: 1,
                            categories: [
                                { id: 17, title: "קטגוריית משנה 2", level: 2 }
                            ]
                        }
                    ]
                },
                {
                    id: 3,
                    title: "קטגוריה שלישת",
                    level: 0,
                    categories: [
                        {
                            id: 24,
                            parentId: 3,
                            title: "קטגורית משנה 3",
                            level: 1,
                            categories: [
                                { id: 18, title: "קטגוריית משנה 2", level: 2 },
                                { id: 19, title: "קטגוריית משנה 3", level: 2 },
                                { id: 20, title: "קטגוריית משנה 4", level: 2 },
                                { id: 21, title: "קטגוריית משנה 5", level: 2 },
                                { id: 22, title: "קטגוריית משנה 6", level: 2 }
                            ]
                        },
                        {
                            id: 25,
                            parentId: 3,
                            title: "3",
                            level: 1,
                            categories: [
                                { id: 23, title: "קטגוריית משנה 2", level: 2 }
                            ]
                        }
                    ]
                }
            ];

            result.resolve(categories);

            return result.promise;
        }

        function getFilters() {

            var result = $q.defer();
            var filters = [
                {
                    id: 1,
                    title: "פילטר 1",
                    level: 1,
                    values: [
                        { id: 11, title: "פילטר משנה 11", level: 2 },
                        { id: 12, title: "פילטר משנה 12", level: 2 },
                        { id: 13, title: "פילטר משנה 13", level: 2 },
                        { id: 14, title: "פילטר משנה 14", level: 2 },
                        { id: 15, title: "פילטר משנה 15", level: 2 }
                    ]
                },
                {
                    id: 2,
                    title: "פילטר 2",
                    level: 1,
                    values: [
                        { id: 21, title: "פילטר משנה 21", level: 2 },
                        { id: 22, title: "פילטר משנה 22", level: 2 },
                        { id: 23, title: "פילטר משנה 23", level: 2 },
                        { id: 24, title: "פילטר משנה 24", level: 2 },
                        { id: 25, title: "פילטר משנה 25", level: 2 }
                    ]
                },
                {
                    id: 3,
                    title: "פילטר 3",
                    level: 1,
                    values: [
                        { id: 31, title: "פילטר משנה 31", level: 2 },
                        { id: 32, title: "פילטר משנה 32", level: 2 },
                        { id: 33, title: "פילטר משנה 33", level: 2 },
                        { id: 34, title: "פילטר משנה 34", level: 2 },
                        { id: 35, title: "פילטר משנה 35", level: 2 }
                    ]
                },
                {
                    id: 4,
                    title: "פילטר 4",
                    level: 1,
                    
                    values: [
                        { id: 41, title: "פילטר משנה 41", level: 2 },
                        { id: 42, title: "פילטר משנה 42", level: 2 },
                        { id: 43, title: "פילטר משנה 43", level: 2 },
                        { id: 44, title: "פילטר משנה 44", level: 2 },
                        { id: 45, title: "פילטר משנה 45", level: 2 }
                    ]
                }

            ];

            result.resolve(filters);

            return result.promise;
        }

        return {
            getCategories: getCategories,
            getFilters: getFilters
        };

    }];

})(_, Simple, WallaShops);