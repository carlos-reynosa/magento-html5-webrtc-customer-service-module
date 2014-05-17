/*
 **Purpose:The directive creates a list of current remote media session attempting to connect to the local user.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering remotePersonConnectionList directive.');

    directives.directive('remotePersonConnectionList', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,


            controller: 'RemotePersonConnectionListController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/RemotePersonConnectionListTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});