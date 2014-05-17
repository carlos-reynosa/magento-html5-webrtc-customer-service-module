/*
 **Purpose:
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller TextCommunicationControlPanelController');

    controllersModule.controller('textCommunicationControlPanelController', ['$scope','RemotePersonService','TextMessageList',function ($scope,RemotePersonService,TextMessageList) {

        /**
         * Lets us get a reference to the global remote person in order to send messages to that person.
         * @type {RemotePersonService}
         */
        $scope.RemotePersonService=RemotePersonService;

        /**
         *
         * @type {TextMessageList}
         */
        $scope.TextMessageList=TextMessageList;

        /**
         * Model that represents the current text that the user has typed into an input box.
         * This model is bound to a form within a view in this scope.
         * @type {string}
         */
        $scope.postMessageText='';

        /**
         * Gets the current text within the input box model and sends the text as the body of a message to the
         * current global remote person.
         */
        $scope.sendPostMessage=function(){


            var currentRemotePerson=$scope.RemotePersonService.getCurrentRemotePerson();

            if(currentRemotePerson){

                currentRemotePerson.postMessage($scope.postMessageText).done(function(message){

                    /**
                     * Once the message has been sent add it to the current list of displayed messages.
                     * @this $scope
                     */
                    this.TextMessageList.addMessageItem(message);

                },$scope);
            }

        };

    }]);
});