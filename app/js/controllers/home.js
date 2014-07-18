(function (_, S, WS) {

    WS.HomeController = ["$scope", "promotionsService", "productService", "$q", "network", "$timeout", function ($scope, promotionsService, productService, $q, network, $timeout) {
        $scope.clear();
        $scope.stars = _.range(2, 11);
        $scope.openPromotion = function (url) {
            if (url) {
                promotionsService.openPromotion(url);
            }
        };

        function isSelected(promotion) {
            return $scope.selectedPromotion.id === promotion.id;
        }

        function select(promotion) {
            $scope.selectedPromotion = promotion;
            $scope.currentIndex = _.indexOf($scope.main_promotions, $scope.selectedPromotion);
        }

        $scope.direction = 'left';
        $scope.currentIndex = 0;
        function setCurrentSlideIndex(index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
            $scope.selectedPromotion = $scope.main_promotions[index];
        };

        function next() {
            $scope.direction = 'right';
            setCurrentSlideIndex(($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.main_promotions.length - 1);

        }
        function back() {
            $scope.direction = 'left';
            setCurrentSlideIndex(($scope.currentIndex < $scope.main_promotions.length - 1) ? ++$scope.currentIndex : 0);

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
            next: next,
            back: back
        });

        $scope.firstPromotion = null;
        $scope.secondPromotion = null;

        $scope.promotionsCategories = [];
        function loadSidePromotions() {
            return promotionsService.getSeasonalImages().then(loadSeasonalPromotions);
        }
        $scope.main_promotions = null;

        function loadMainPromotions() {
            return promotionsService.getMainPromotions().then(function (items) {
                $scope.main_promotions = items;

                select($scope.main_promotions[0]);

                $("#promotion-tabs a").tab();
            });
        }

        function loadCategoryPromotions() {
            productService.getOtherInterestedPromotionsCategories().then(function(items) {
                $scope.otherInterested = {
                    name: "במה מתעניינים עכשיו גולשים אחרים",
                    products: items
                };
            });
            productService.getBestSellersPromotionsCategories().then(function(items) {
                $scope.bestSellers = {
                        name: "הנמכרים ביותר",
                        products: items
                    };
            });
            productService.getPromotionsCategories().then(function(promotions) {
                $scope.promotionsCategories = promotions;
            });
        }

        function displayError(error) {
            $scope.fatalError = error;
        }
        $scope.reload = function () {
            $scope.notifyProgress()
                .then( loadMainPromotions)
                .then(loadSidePromotions)
                .then(loadCategoryPromotions)
                .catch(displayError)
                .finally($scope.stopProgress);
        }

        
        $scope.reload();

    }];

})(_, Simple, WallaShops);