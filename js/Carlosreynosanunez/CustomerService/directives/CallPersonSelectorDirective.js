/*
 **Purpose:Bootstraps the html needed for the person selector widget.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    Logger.info('Registering CallPersonSelector directive.');

    directives.directive('callPersonSelector', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope:{

            },

            controller: 'CallPersonSelectorController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/CallPersonSelectorTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

    });

});