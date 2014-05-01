(function (_, S, WS) {

    WS.HomeController = ["$scope", "promotionsService", "productService", "$q", "network", "$timeout", function ($scope, promotionsService, productService, $q, network, $timeout) {
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

            //var nextIndex = ($scope.main_promotions.indexOf($scope.selectedPromotion) + 1);
            //if (nextIndex >= $scope.main_promotions.length) {
            //    nextIndex -= $scope.main_promotions.length;
            //}
            //$scope.selectedPromotion = $scope.main_promotions[nextIndex];
        }
        function back() {
            $scope.direction = 'left';
            setCurrentSlideIndex(($scope.currentIndex < $scope.main_promotions.length - 1) ? ++$scope.currentIndex : 0);

            //var backIndex = ($scope.main_promotions.indexOf($scope.selectedPromotion) - 1);
            //if (backIndex < 0) {
            //    backIndex += $scope.main_promotions.length;
            //}
            //$scope.selectedPromotion = $scope.main_promotions[backIndex];
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
            back: back,
            write: function () {
                console.log("WWW");
            }
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
                var promotions = _.union($scope.promotionsCategories, items[0], items[1], items[2]);
                $scope.promotionsCategories = promotions;
                $timeout(function () {
                    _.each(promotions, function (promotion) {
                        $scope.loadImages(promotion.products);

                    });
                    $scope.promotionsCategories = promotions;
                }, 200);
                return promotions;
            });


        }

        function displayError(error) {
            $scope.fatalError = error;
        }
        $scope.reload = function () {
            $scope.notifyProgress()
                .then(function () {
                    return $q.all([
                        loadMainPromotions(),
                        loadSidePromotions(),
                        loadCategoryPromotions()
                    ]);
                })
                //.then( loadMainPromotions)
                //.then(loadSidePromotions)
                //.then(loadCategoryPromotions)
                .catch(displayError)
                .finally($scope.stopProgress);
        }


        $scope.reload();

    }];

})(_, Simple, WallaShops);