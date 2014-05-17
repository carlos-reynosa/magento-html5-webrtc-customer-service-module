/*
 ** TextMessageList service which is responsible for keeping a single reference
 * for the current list of message being displayed to the user. The service broadcasts an event notifying listeners
 * that the list of items has changed (new item added or new list set). This service is responsible for storing
 * vline message objects in a simplified for that we want.
 *
 */
define(['angular', 'Logger', 'vline', './module'], function (ng, Logger, vline, servicesModule) {

    'use strict';

    Logger.info('Registering TextMessageList factory.');

    servicesModule.factory('TextMessageList', ['$rootScope', function ($rootScope) {

        var messageList = [];


        /**
         * List of current messages in an application specific format.
         * @type TextMessageList
         */
        var TextMessageList={};


        /**
         * Holds constant values for the TextMessageList service.
         *
         * @memberOf TextMessageList
         */
        TextMessageList.CONSTANTS={

        };

        /**
         * Holds event name constants which are emitted by the TextMessageList service.
         * @memberOf TextMessageList.CONSTANTS
         */
        TextMessageList.CONSTANTS.EVENTS={

        };


        /**
         * Event name that represents a change in the current list of conversation messages.
         * TODO: Event name should be namespaced under the application name.
         * @type {string}
         * @memberOf TextMessage.CONSTANTS.EVENTS
         */
        TextMessageList.CONSTANTS.EVENTS.TEXT_MESSAGE_LIST_CHANGE='TEXT_MESSAGE_LIST_CHANGE';

        /**
         *Returns the current list of text message as an array of strings.
         * @returns {Array}
         * @memberOf TextMessageList
         */
        TextMessageList.getMessageList = function () {
            return messageList;
        };


        /**
         *Sets the current message list object.
         * @param listOfMessages
         * @memberOf TextMessageList
         * @this TextMessageList
         */
         TextMessageList.setMessageList = function (listOfMessages) {

             var tempList=[];
           for(var i=0;i<listOfMessages.length;i++){

               tempList.push(this.getMessageObject(listOfMessages[i]));

           }


            messageList = tempList;

            $rootScope.$broadcast(this.CONSTANTS.EVENTS.TEXT_MESSAGE_LIST_CHANGE);
        };


        /**
         * Returns an application specific form for a vline session.
         * @param message
         * @returns {{senderDisplayName: *, senderId: *, messageBody: (HTMLElement|*)}}
         */
        TextMessageList.getMessageObject=function(message){

            var messageItem={
                senderDisplayName: message.getSender().getDisplayName(),
                senderId: message.getSenderId(),
                messageBody:message.getBody()
            };

            return messageItem;
        };

        /**
         * Adds a new message to the current list of messages.
         * @this TextMessageList
         * @param message
         * @memberOf TextMessageList
         */
        TextMessageList.addMessageItem = function (message) {

            messageList.push(this.getMessageObject(message));

            $rootScope.$broadcast(this.CONSTANTS.EVENTS.TEXT_MESSAGE_LIST_CHANGE);

        };

        return TextMessageList;

    }]);


});