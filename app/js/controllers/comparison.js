(function (_, S, WS) {

    WS.ComparisonController = ["$scope", "$location", "$routeParams", "wallaShopsApi", function ($scope, $location, $routeParams, wallaShopsApi) {
        
        var maxProducts = 4;
        $scope.round = function (num) {
            var result = Math.ceil(num);
            return result;
        }

        $scope.isFull = function() {
            var result = false;
            if ($scope.productsToCompare.length >= maxProducts) {
                result = true;
            }
            return result;
        };
        
        $scope.isEmpty = function () {
            var result = false;
            if ($scope.productsToCompare.length == 0) {
                result = true;
            }
            return result;
        };

        $scope.addPruduct = function () {
            if ($scope.productsToCompare.length < maxProducts) {
                $location.path("/Search");
            }
        };

        

        $scope.getFeatures = function () {
            return wallaShopsApi.getFeaturesToComparison(_.pluck($scope.productsToCompare, "id")).then(function(features) {
                $scope.features = features;
            });
        };
        
        $scope.notifyProgress()
            .then(function() {
                $scope.features = [];
            })
            .then($scope.getFeatures)
            .finally($scope.stopProgress);

        

        

    }];

})(_, Simple, WallaShops);