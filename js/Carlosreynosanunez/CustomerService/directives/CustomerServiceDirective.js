/*
 **Purpose: Defines a directive that will represent the
 * customer service module in genera. It will perform the initial transformation
 * into the rest of the customer service module elements.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering customerServiceDirective');

    directives.directive('customerServiceDirective', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            controller:'CustomerServiceController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/CustomerService.html',

            //works for each instance of the template
            link: function (scope,element,attrs) {


            }


        };

        //return a configuration for the directive
    });

});