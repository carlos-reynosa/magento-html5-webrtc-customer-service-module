/*
 **Purpose:
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering ClientLoginStatusDirective directive.');

    directives.directive('clientLoginStatus', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope: {

            },

            controller: 'ClientLoginStatusController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/ClientLoginStatusTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});