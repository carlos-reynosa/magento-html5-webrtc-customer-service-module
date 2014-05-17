/*
 **Purpose:
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering textCommunicationControlPanel');

    directives.directive('textCommunicationControlPanel', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            controller: 'textCommunicationControlPanelController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/TextCommunicationControlPanelTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});