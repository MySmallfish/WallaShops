(function (_, S, WS) {

    WS.ComparisonController = ["$scope", function ($scope) {
        $scope.category = {};
        $scope.category.features = [
            { header: "מוצר", name: "id" },
            { header: "שם", name: "name" },
            { header: "סוג", name: "imageUrl", type: "image" },
            { header: "מחיר", name: "type" },
            { header: "סגירה", name: "price" },
            { header: "תאריך", name: "delivery" },
            { header: "אספקה", name: "closing" }
        ];
        


        $scope.products = [
            {
                id: 1,
                name: "שם1",
                imageUrl: "img",
                type: 2,
                price: 3,
                delivery: 4,
                closing: 5,
                date: 6,
                supply: 7
            },
            {
                id: 2,
                imageUrl: "img",
                name: "שם2",
                type: 2,
                price: 3,
                delivery: 4,
                closing: 5,
                date: 6,
                supply: 7
            },
            {
                id: 3,
                imageUrl: "img",
                name: "שם3",
                type: 2,
                price: 3,
                delivery: 4,
                closing: 5,
                date: 6,
                supply: 7
            },
            {
                id: 4,
                imageUrl: "img",
                name: "שם4",
                type: 2,
                price: 3,
                delivery: 4,
                closing: 5,
                date: 6,
                supply: 7
            }
        ];
    


}];

})(_, Simple, WallaShops);