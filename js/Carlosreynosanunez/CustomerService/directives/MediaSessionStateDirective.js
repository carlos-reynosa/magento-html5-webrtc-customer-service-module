/*
 **Purpose: Directive is responsible for bootstraping a widget that displays media state of other widgets to the user.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering mediaStreamState directive.');

    directives.directive('mediaSessionState', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope: {

                streamType:'@'
            },

            controller: 'MediaSessionStateController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/MediaSessionStateTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});