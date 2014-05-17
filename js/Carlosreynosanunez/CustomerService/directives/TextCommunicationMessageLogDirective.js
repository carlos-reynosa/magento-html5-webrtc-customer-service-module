/*
 **Purpose: This directive should bootstrap the html and controllers necessary to allow
 * a local person to view a text message conversation.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering textCommunicationMessageLog ');

    directives.directive('textCommunicationMessageLog', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope:{

            },
            controller:'TextCommunicationMessageLogController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/TextCommunicationMessageLogTemplate.html'




        };

        //return a configuration for the directive
    });

});