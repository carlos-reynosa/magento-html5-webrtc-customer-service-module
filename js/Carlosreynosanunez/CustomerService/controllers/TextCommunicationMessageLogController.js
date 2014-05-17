/*
 **Purpose: The controller will initialize the model that will contain an up to date list of current messages to display.
 * If a new message is added to the list by either the local or remote user, then the controller should update the model.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller TextCommunicationMessageLogController');

    controllersModule.controller('TextCommunicationMessageLogController', ['$scope', 'RemotePersonService', 'TextMessageList',
        'WebRtcClientService', '$timeout', function ($scope, RemotePersonService, TextMessageList, WebRtcClientService, $timeout) {

            /**
             * Service that will allow us to update the list of  currently displayed messages.
             * The service does the job of changing the vline representation into a model that we will work with.
             * @type {TextMessageList}
             */
            $scope.TextMessageList = TextMessageList;

            /**
             *Allows us to get a reference to the global client.
             * @type {WebRtcClientService}
             */
            $scope.WebRtcClientService = WebRtcClientService;

            /**
             *
             * @type {vline.Client}
             */
            $scope.WebRtcClient = WebRtcClientService.getClient();

            /**
             * @type {RemotePersonService} This allows us to access remote persons.
             */
            $scope.RemotePersonService = RemotePersonService;

            /**
             * Model representing the current list of displayed messages.
             * @type {Array}
             */
            $scope.messageList = [];

            $scope.clearLogMessages = function () {

                $timeout(function () {
                    $scope.messageList = [];
                });

            };

            /**
             * A media session has been closed thus we need to clear out the model that represents the
             * current conversation with the currently set remote person.
             * TODO: Should  only clear out of the if the media session that entered the closed state is
             * from the currently set remote person.
             */
            $scope.WebRtcClient.on('enterState:closed', function () {

                this.clearLogMessages();

            }, $scope);

            /**
             * Checks if a vline message is from the currently set global remote person.
             * @param messageFromPerson {vline.Message}
             * @returns {boolean} True if the message is from the current remote person or false otherwise.
             */
            $scope.isMessageFromCurrentPerson = function (messageFromPerson) {
                return messageFromPerson.getId() === $scope.RemotePersonService.getCurrentRemotePerson().getId();
            };

            /**
             * Listen to check if we receive a new message and add it to the model representing the currently displayed
             * conversation between the local and remote clients(persons). We only update the list if the message that
             * was received was from the currently set person.
             */
            $scope.WebRtcClient.on('recv', function (event) {

                /**
                 * New message that was received.
                 * @type {vline.Message}
                 */
                var message = event.message;

                /**
                 * The person that sent the currently received message.
                 * @type {vline.Person}
                 */
                var messageFromPerson = event.target;

                if (this.isMessageFromCurrentPerson(messageFromPerson)) {

                    this.TextMessageList.addMessageItem(message);
                }

            }, $scope);

            $scope.initializeLogMessages = function (maxMessages) {

                /**
                 * Currently set remote person that we will grabs conversation messages from.
                 *
                 * TODO: Were assuming that the current session that just became active is form the person that is
                 * set globally. We need to add a check that double checks this is true before updating the currently
                 * displayed conversation.
                 *
                 * @type {vline.person | null}
                 */
                var remotePerson = $scope.RemotePersonService.getCurrentRemotePerson();

                if (remotePerson) {

                    /**
                     * Grab message from the person. Currently we are grabbing  only 5 at a time.
                     * TODO: The number of messages that are grabbed should come from a constant or configuration variable.
                     */
                    remotePerson.getMessages(maxMessages).done(function (messageCollection) {

                        var tempMessageList = [];

                        messageCollection.forEach(function (message) {

                            tempMessageList.push(message);

                        }, this);

                        /**
                         * Update the model that represents the currently displayed conversation.
                         * @this $scope
                         */
                        this.TextMessageList.setMessageList(tempMessageList);

                    }, $scope);

                }

            };


            $scope.$on('REMOTE_PERSON_DISCONNECT', function (event) {

                var currentScope = event.currentScope;

                currentScope.clearLogMessages();

            });

            $scope.$on($scope.RemotePersonService.CONSTANTS.REMOTE_PERSON_CLEARED, function (event) {

                /**
                 * @type $scope
                 */
                var currentScope = event.currentScope;

                currentScope.clearLogMessages();

            });

            /**
             * Has the unintended consequence that if a person is selected within the person selector widget within the
             * admin view the the conversation is updated.
             */
            $scope.$on($scope.RemotePersonService.CONSTANTS.REMOTE_PERSON_CHANGE, function (event) {

                /**
                 * @type $scope
                 */
                var currentScope = event.currentScope;

                var maxMessage = 5;

                currentScope.initializeLogMessages(maxMessage);


            });

            /**
             * We want to initialize the current viewed conversation if a media session becomes active. If one becomes
             * active this lets us know that we have started a call with someone and there is a current person availabel
             * to get messages from.
             */
            $scope.WebRtcClient.on('enterState:active', function () {

                this.initializeLogMessages(5);

            }, $scope);


            //The message display should be updated when there has been a change in the list of messages.
            $scope.$on($scope.TextMessageList.CONSTANTS.EVENTS.TEXT_MESSAGE_LIST_CHANGE, function (event) {

                var currentScope = event.currentScope;

                currentScope.messageList = currentScope.TextMessageList.getMessageList();

                currentScope.$apply();
            });

        }]);
});