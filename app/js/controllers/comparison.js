(function (_, S, WS) {

    WS.ComparisonController = ["$scope", function ($scope) {
        var productCount = 0;
        var maxProducts = 4;

        $scope.isNotEmpty = function () {
            var result = false;
            if (productCount > 0) {
                result = true;
            }

            return result;
        };

        $scope.addPruduct = function () {
            if (productCount < maxProducts) {
                productCount++;
                ///////////////////////////////////////////////////////////////////////////////add product!!!!      
            }
        };

        $scope.category = {};
        $scope.category.features = [
            { header: "מוצר", name: "id" },
            { header: "שם", name: "name" },
            { header: "סוג", name: "imageUrl", type: "image" },
            { header: "מחיר", name: "type" },
            { header: "סגירה", name: "price" },
            { header: "תאריך", name: "delivery" },
            { header: "אספקה", name: "closing" },
            { header: "יבואן", name: "importer" }
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