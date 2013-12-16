(function (_, S, WS) {

    WS.HomeController = function ($scope) {
        $scope.name = "Yair";
        $scope.main_promotion = {
            promotion: "app/img/pic1.png",
            name: "xyz"
        };
        
        $scope.left_up = {
            promotion: "app/img/pic3.png",
            name: "xyz"
        };
        
        $scope.left_down = {
            promotion: "app/img/pic3.png",
            name: "xyz"
        };
        
        $scope.product = {
            promotion: "app/img/product.png",
            name: "xyz"
        };

        $scope.icon = {
            promotion: "app/img/icon.png",
            name: "xyz"
        };

        $scope.products = [
            { id: 1, title: "מכונת גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000" },
            { id: 2, title: "מכונת גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000" },
            { id: 3, title: "מכונת גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000" },
            { id: 4, title: "מכונת גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000" },
        ];

    };

})(_, Simple, WallaShops);