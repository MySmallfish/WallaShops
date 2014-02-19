(function (_, S, WS) {

    WS.ComparisonController = ["$scope", "$location", "$routeParams", function ($scope, $location, $routeParams) {
        $scope.productsToCompare = $routeParams.productsToCompare;

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
                console.log("ADD PRODUCT TO COMPARE");
                $location.path("/Search").search({
                    productsToCompare: $scope.productsToCompare
                });
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

        function onProductDelited(eventInfo, args) {
            $scope.productsToCompare.splice($scope.productsToCompare.indexOf(args.product), 1);
            
        };
        
        $scope.$on("WallaShops.ProductDelited", onProductDelited);

        

    }];

})(_, Simple, WallaShops);