(function (_, S, WS) {

    WS.ComparisonController = ["$scope", "$location", "$routeParams", "wallaShopsApi", function ($scope, $location, $routeParams, wallaShopsApi) {
        
        var maxProducts = 4;

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
        
        $scope.getFeatures();

        $scope.features = [];

        function onProductDeleted(eventInfo, args) {
            $scope.productsToCompare.splice($scope.productsToCompare.indexOf(args.product), 1);
            
        };

        $scope.$on("WallaShops.ProductDeleted", onProductDeleted);
        

    }];

})(_, Simple, WallaShops);