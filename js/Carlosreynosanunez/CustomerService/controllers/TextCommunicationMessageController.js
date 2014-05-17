/*
 **Purpose:
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller TextCommunicationMessageController');

    controllersModule.controller('TextCommunicationMessageController', ['$scope','WebRtcClientService', function ($scope,WebRtcClientService) {

        $scope.WebRtcClientService=WebRtcClientService;

    }]);
});