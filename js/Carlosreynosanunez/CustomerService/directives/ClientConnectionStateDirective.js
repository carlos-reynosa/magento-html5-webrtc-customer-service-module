/*
 **Purpose: This directive will be used to display the current connection status of the vline client to the vline cloud.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    Logger.info('Registering clientConnectionState directive.');

    directives.directive('clientConnectionState', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope:{

            },

            controller: 'ClientConnectionStateController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/ClientConnectionStateTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});