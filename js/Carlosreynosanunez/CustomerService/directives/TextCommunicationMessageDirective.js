/*
 **Purpose:
 */
define(['angular', 'Logger', './module'], function (ng, Logger, directives) {

    'use strict';

    Logger.info('Registering textCommunicationMessage directive.');

    directives.directive('textCommunicationMessage', ['WebRtcClientService', function (WebRtcClientService) {


        return {

            // Can be used as attribute
            restrict: 'A',

            replace: false,

            scope: {
                messageBody: '@',
                senderId: '@',
                senderMessageDisplayText: '@'

            },

            controller: 'TextCommunicationMessageController',

            //point to the new layout
            templateUrl: '/js/Carlosreynosanunez/CustomerService/templates/TextCommunicationMessageTemplate.html',

            //works for each instance of the template
            link: function ($scope, element, attrs) {


                //Need to know if a local or remote message is being displayed
                var currentMessageSenderId = $scope.senderId;

                var localPersonId = $scope.WebRtcClientService.getClientLoginSession().getLocalPersonId();


                $scope.isMessageFromLocal= currentMessageSenderId === localPersonId;


                $scope.messageSenderDisplayText = $scope.senderMessageDisplayText;


            }


        };

        //return a configuration for the directive
    }]);

});