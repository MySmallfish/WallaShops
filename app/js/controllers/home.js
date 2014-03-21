(function (_, S, WS) {

    WS.HomeController = ["$scope", "promotionsService", "productService", "$q", function ($scope, promotionsService, productService, $q) {

        $scope.openPromotion = function (url) {
            if (url) {
                promotionsService.openPromotion(url);
            }
        };

        function isSelected(promotion) {
            return $scope.selectedPromotion === promotion;
        }

        function select(promotion) {
            $scope.selectedPromotion = promotion;
        }

        function swipeNext(promotion) {
            var nextIndex = ($scope.main_promotions.indexOf(promotion) + 1);
            if (nextIndex >= $scope.main_promotions.length) {
                nextIndex -= $scope.main_promotions.length;
            }
            $scope.selectedPromotion = $scope.main_promotions[nextIndex];
        }

        function swipeBack(promotion) {
            var backIndex = ($scope.main_promotions.indexOf(promotion) - 1);
            if (backIndex < 0) {
                backIndex += $scope.main_promotions.length;
            }
            $scope.selectedPromotion = $scope.main_promotions[backIndex];
        }

        function getRandom(max) {
            return Math.floor((Math.random() * max));
        }

        function getRandomPromotion(promotions) {
            if (promotions.length) {
                var randomIndex = getRandom(promotions.length);
                return promotions[randomIndex];
            }
        }

        function loadSeasonalPromotions(promotions) {
            $scope.firstPromotion = getRandomPromotion(promotions.top);
            $scope.secondPromotion = getRandomPromotion(promotions.bottom);
        }

        _.extend($scope, {
            select: select,
            isSelected: isSelected,
            swipeNext: swipeNext,
            swipeBack: swipeBack
        });

        $scope.firstPromotion = null;
        $scope.secondPromotion = null;

        $scope.promotionsCategories = [];
        function loadSidePromotions(){
            return promotionsService.getSeasonalImages().then(loadSeasonalPromotions);
        }
        $scope.main_promotions = null;

        function loadMainPromotions() {
            return promotionsService.getMainPromotions().then(function(items) {
                $scope.main_promotions = items;
                $scope.selectedPromotion = $scope.main_promotions[0];
            });
        }

        function loadCategoryPromotions() {
            return $q.all([
                productService.getOtherInterestedPromotionsCategories().then(function (items) {
                    return [{
                        name: "במה מתעניינים עכשיו גולשים אחרים",
                        products: items
                    }];
                }),
                productService.getBestSellersPromotionsCategories().then(function (items) {
                    return [{
                        name: "הנמכרים ביותר",
                        products: items
                    }];
                }),
                productService.getPromotionsCategories()
            ]).then(function (items) {
                $scope.promotionsCategories = _.union($scope.promotionsCategories, items[0], items[1], items[2]);
            });


        }

        $scope.notifyProgress()
            .then(loadMainPromotions)
            .then(loadSidePromotions)
            .then(loadCategoryPromotions)
            .finally($scope.stopProgress);


    }];

})(_, Simple, WallaShops);