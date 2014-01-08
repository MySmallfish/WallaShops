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
            { header: "שם", name: "name" },
            { header: "סוג", name: "type" },
            { header: "מחיר", name: "price" },
            { header: "משלוח", name: "delivery" },
            { header: "זמן אספקה", name: "supply" },
            { header: "סגירה", name: "closing" },
            { header: "יבואן", name: "importer" }
    ];



        $scope.products = [
            {
                id: 1,
                title: "שם1",
                imageUrl: "app/img/product.png",
                type: 2,
                price: "1000 ₪",
                delivery: "40 ₪",
                closing: "1.1.14",
                supply: "שבוע"
            },
            {
                id: 2,
                title: "שם2",
                imageUrl: "app/img/product.png",
                type: 2,
                price: "1000 ₪",
                delivery: "40 ₪",
                closing: "1.1.14",
                supply: "שבוע"
            },
            {
                id: 3,
                title: "שם3",
                imageUrl: "app/img/product.png",
                type: 2,
                price: "1000 ₪",
                delivery: "40 ₪",
                closing: "1.1.14",
                supply: "שבוע"
            },
            {
                id: 4,
                title: "שם4",
                imageUrl: "app/img/product.png",
                type: 2,
                price: "1000 ₪",
                delivery: "40 ₪",
                closing: "1.1.14",
                supply: "שבוע"
            }
        ];



    }];

})(_, Simple, WallaShops);