﻿(function (S, WS) {

    WS.AppHeaderDirective = {
        restrict: 'E',
        templateUrl: 'app/js/directives/app-header/app-header.html',
        scope: false,
        replace: true,
        controller: ["$scope", "config", function ($scope, config) {
            var wsUrl = config.wsUrl;

            $scope.openUserCard = function () {
                window.open(wsUrl + "/service/customer/CustomerMainPage.aspx", "_blank");
            };

            $scope.goBack = function() {
                window.history.back();

            };

            $scope.preventefault = function($event) {
                $event.preventDefault();
            };

        }],
        link: function (scope, element, attributes, ctrl) {
            // bind clicks...
        }
    };

})(Simple, WallaShops);