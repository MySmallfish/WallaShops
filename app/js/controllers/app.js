(function (_, S, WS) {

    WS.AppController = function ($scope) {

        $scope.$on("WallaShops.CategorySelected", function (eventInfo, args) {
            console.log("CATEGORY!!!! ", args);
        });

    };

})(_, Simple, WallaShops);



