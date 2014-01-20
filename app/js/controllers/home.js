(function (_, S, WS) {

    WS.HomeController = ["$scope", "promotionsService", "productService", "$http", function ($scope, promotionsService, productService, $http) {
        //$http({
        //    url: "http://test.wallashops.co.il/api/menu/GetMenus?menuType=2",
        //    headers: {
        //        'X-WallaShops-App': "Tablet"
        //    }
        //}).then(function (items) {
        //    navigator.notification.alert("HERE! " + items.length);
        //    console.log("ITEMS", items);
        //}, function (error) {
        //    console.error("ERROR", error);
        //});

        function isSelected(promotion) {
            return $scope.selectedPromotion === promotion;
        }

        function select(promotion) {
            $scope.selectedPromotion = promotion;
        }

        function getRandom(max) {
            return Math.floor((Math.random() * max));
        }

        function loadSeasonalPromotions(promotions) {
            if (promotions.length) {
                var randomIndex = getRandom(promotions.length);
                $scope.firstPromotion = promotions[randomIndex];
                if (promotions.length > 1) {
                    var randomIndex2 = getRandom(promotions.length);
                    while (randomIndex2 === randomIndex) {
                        randomIndex2 = getRandom(promotions.length);
                    }
                    $scope.secondPromotion = promotions[randomIndex2];
                }
            }
        }
        
        _.extend($scope, {
            select: select,
            isSelected: isSelected
        });

        $scope.firstPromotion = null;
        $scope.secondPromotion = null;

        $scope.promotionsCategories = null;
        
        promotionsService.getSeasonalImages().then(loadSeasonalPromotions);

        $scope.main_promotions = null;

        promotionsService.getMainPromotions().then(function (items) {
            $scope.main_promotions = items;
            $scope.selectedPromotion = $scope.main_promotions[0];
        });

        productService.getPromotionsCategories().then(function (items) {
            $scope.promotionsCategories = items;
        });


    }];

})(_, Simple, WallaShops);