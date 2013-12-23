(function (_, S, WS) {

    WS.HomeController = function ($scope) {
        $scope.name = "Yair";
        
        $scope.main_promotion = {
            promotion: "app/img/pic1.png",
            name: "xyz"
        };

        $scope.seasonal_img1 = {
            promotion: "app/img/pic3.png",
            name: "xyz"
        };

        $scope.seasonal_img2 = {
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
        
        $scope.promotionsCategories = [{
                name: "לאן ללכת?",
                products: [
                    { id: 1, title: "א. מכונה", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                    { id: 2, title: "ג. גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                    { id: 3, title: "ב. יפית", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                    { id: 4, title: "מכונת גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                ],
                id: 1
            },
            {
                name: "לאיזה מכירות כדאי לשים לב",
                products: [
                    { id: 1, title: "א. מכונה", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                    { id: 2, title: "ג. גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                    { id: 3, title: "ב. יפית", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                    { id: 4, title: "מכונת גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
                ],
                id: 2
            }];
 


    };

})(_, Simple, WallaShops);