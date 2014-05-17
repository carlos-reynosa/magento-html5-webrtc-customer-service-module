/*
 **Purpose: This controller is responsible for listening to the login status of the vline client and updating the style
 * and view representation of the client status.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller ClientLoginStatusController controller.');

    controllersModule.controller('ClientLoginStatusController', ['$scope', '$timeout', 'WebRtcClientService',
        function ($scope, $timeout, WebRtcClientService) {

        $scope.WebRtcClientService = WebRtcClientService;
        $scope.WebRtcClient = $scope.WebRtcClientService.getClient();

        $scope.loginStateStatusStyleMapping = {
            'false': {style: 'label-default', label: 'Logged Out'},

            'true': {style: 'label-success', label: 'Logged In'}
        };

        $scope.isLoggedIn = $scope.WebRtcClient.isLoggedIn();


        $scope.loggedInStatus = false;

        /**
         * Gets the current logged in status and its associated view label and style and tells the view to update.
         */
        $scope.updateLoginStatusView = function () {

            $timeout(function () {

                $scope.loggedInStatus = $scope.WebRtcClient.isLoggedIn();

            });

        };

        $scope.WebRtcClient.on('login', function () {

            this.updateLoginStatusView();

        }, $scope);


        $scope.WebRtcClient.on('logout', function () {

            this.updateLoginStatusView();

        }, $scope);


    }]);
});