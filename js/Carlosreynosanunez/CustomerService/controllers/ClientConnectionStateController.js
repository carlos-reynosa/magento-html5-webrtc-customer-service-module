/*
 **Purpose: This controller will listen to changes in the connection between the client and the vline cloud. Changes
 * will cause the controller to update the view.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller ClientConnectionStateController controller.');

    controllersModule.controller('ClientConnectionStateController', ['$scope', '$timeout', 'WebRtcClientService',
        'ConnectionStateViewConstants', function ($scope, $timeout, WebRtcClientService,
                                                  connectionStateStyleMapping) {

        $scope.WebRtcClientService = WebRtcClientService;
        $scope.WebRtcClient = $scope.WebRtcClientService.getClient();

        $scope.stateStyleMapping = connectionStateStyleMapping;

        $scope.currentState = $scope.WebRtcClient.getConnectionState();

        /**
         *  Updates the label and style of the client connection state view by grabbing
         *  the current state directive from the client.
         */
        $scope.updateClientConnectionStateView = function () {

            //Grab the current state
            var clientConnectionState = $scope.WebRtcClient.getConnectionState();

            $timeout(function () {

                $scope.currentState = clientConnectionState;
            });
        };

        $scope.WebRtcClient.on('change:connectionState', function () {

            this.updateClientConnectionStateView();

        }, $scope);
    }]);
});