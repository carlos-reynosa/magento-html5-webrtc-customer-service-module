/*
 **Purpose: This represents the status of an individual mediasession.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering IncomingPersonCallStatus directive.');

    directives.directive('incomingPersonCallStatus', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope:{

                status:'@'
            },

            controller: 'IncomingPersonCallStatusController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/IncomingPersonCallStatusTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});