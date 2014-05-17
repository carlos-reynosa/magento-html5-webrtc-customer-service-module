/*
 **Purpose: This directive will bootstrap code and html necessary in order to
 * establish text communication between a local and remote person
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering textCommunication Directive');

    directives.directive('textCommunication', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            controller:'TextCommunicationController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/TextCommunicationTemplate.html',

            //works for each instance of the template
            link: function (scope,element,attrs) {


            }


        };

        //return a configuration for the directive
    });

});