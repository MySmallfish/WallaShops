(function (_, S, WS) {

    WS.ComparisonController = ["$scope", "$location", "$routeParams", function ($scope, $location, $routeParams) {
        

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

        $scope.category = {};
        $scope.category.features = [
            { header: "שם", name: "title" },
            { header: "סוג", name: "type" },
            { header: "מחיר", name: "price" },
            { header: "משלוח", name: "delivery" },
            { header: "זמן אספקה", name: "supply" },
            { header: "סגירה", name: "closing" },
            { header: "יבואן", name: "importer" }
        ];

        function onProductDeleted(eventInfo, args) {
            $scope.productsToCompare.splice($scope.productsToCompare.indexOf(args.product), 1);
            
        };
        
        $scope.$on("WallaShops.ProductDeleted", onProductDeleted);
        

        

    }];

})(_, Simple, WallaShops);