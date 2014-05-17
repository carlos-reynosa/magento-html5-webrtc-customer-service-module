/*
 **Purpose: Not currently used. Binding variables come from directive attributes.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller RemotePersonController controller. ');

    controllersModule.controller('RemotePersonController', ['$scope', function ($scope) {

    }]);
});