/*
 **Purpose: The directive is meant to initialize the correct customer service feature depnding on the passed in type.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering customerServiceFeature directive.');

    directives.directive('customerServiceFeature', function () {

        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope: {

                featureType:'@type'
            },

            controller: '',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/CustomerServiceFeatureTemplate.html',

            //works for each instance of the template
            link: function (scope, element, attrs) {


            }


        };

        //return a configuration for the directive
    });

});