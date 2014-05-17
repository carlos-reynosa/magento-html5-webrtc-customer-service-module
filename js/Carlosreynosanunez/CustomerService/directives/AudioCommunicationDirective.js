/*
 **Purpose: This directive is responsible for bootstrap js and html for the audio communication widget.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering audioCommunication directive');

    directives.directive('audioCommunication', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope: {

            },

            controller: 'AudioCommunicationController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/AudioCommunicationTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});