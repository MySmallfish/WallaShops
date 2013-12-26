(function (_, S, WS) {
    
    WS.CategoryService =["$q", function ($q) {
        
        function getCategories() {

            var result = $q.defer();
            var categories =[
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

        return {
            getCategories: getCategories
        };

    }];

})(_, Simple, WallaShops);