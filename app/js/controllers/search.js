(function (_, S, WS) {

    WS.SearchController = function($scope) {

        $scope.products = [
            { id: 1, title: "א. מכונה", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
            { id: 2, title: "ג. גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
            { id: 3, title: "ב. יפית", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
            { id: 4, title: "מכונת גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
            { id: 1, title: "א. מכונה", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
            { id: 2, title: "ג. גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
            { id: 3, title: "ב. יפית", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" },
            { id: 4, title: "מכונת גילוח", subtitle: "לגבר המטרוסקסואלי", rating: "123456", icons: [{ url: "app/img/icon.png" }, { url: "app/img/icon.png" }], imageUrl: "app/img/product.png", price: "1000 שח", details: "לפרטים" }
        ];
    };
    
})(_, Simple, WallaShops);