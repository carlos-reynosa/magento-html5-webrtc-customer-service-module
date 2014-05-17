/*
 **Purpose: The directive will display the visual template for a status label an its style.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering stateIndicator directive');

    directives.directive('stateIndicator', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope: {

                stateStyleMapping:'=',
                currentState:'='

            },

            controller: 'StateIndicatorController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/StateIndicatorTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});