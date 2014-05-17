/*
 **Purpose: TODO: Test directive is working :)
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    Logger.info('Registering RemotePerson directive');

    directives.directive('remotePerson', [function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope: {

                displayName: '@',
                mediaState: '@',
                personId: '@'

            },

            controller: 'RemotePersonController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/RemotePersonTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    }]);

});