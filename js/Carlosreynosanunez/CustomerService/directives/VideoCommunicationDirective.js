/*
 **Purpose: This directive will display html and bootstrap controllers responsible for runnin the
 * video communication widget.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering videoCommunication directive.');

    directives.directive('videoCommunication', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope:{

            },

            controller: 'VideoCommunicationController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/VideoCommunicationTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});