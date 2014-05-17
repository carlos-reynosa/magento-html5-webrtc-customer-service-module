/*
 **Purpose: Listens for incoming remote person connections and updates the model that represents the current list of
 * connections within the remote person selector.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller CallPersonSelectorController controller.');

    controllersModule.controller('CallPersonSelectorController', ['$scope', 'WebRtcClientService', '$timeout',
        'RemotePersonService', function ($scope, WebRtcClientService, $timeout, RemotePersonService) {

            /**
             * Allows us to get a reference to the global client instance.
             * @type {WebRtcClientService}
             */
            $scope.WebRtcClientService = WebRtcClientService;

            /**
             *
             *Allows us to know when a new media session is added and thus when we should represent a new person
             * within the person selector. Also allows us to listen to changes in the state of a remote person's connection
             * to the local client.
             * @type {vline.Client}
             */
            $scope.WebRtcClient = WebRtcClientService.getClient();

            /**
             *Allows us to set the current application remote person globally.
             *
             * @type {RemotePersonService}
             */
            $scope.RemotePersonService = RemotePersonService;

            $scope.addedMediaSessions = [];

            $scope.personList = [];

            $scope.$timeout = $timeout;

            //When when a media session has been added we need to update the list of person.
            $scope.WebRtcClient.on('add:mediaSession', function (event) {

                this.updatePersonList();

            }, $scope);


            //When a media session changes state we should update the list of persons.
            $scope.WebRtcClient.on('change:mediaState', function () {

                this.updatePersonList();

            }, $scope);

            /**
             * Returns true if the passed in message has the currently global set person as the current person, false otherwise.
             * @param {vline.Message} remoteMessage Message coming from a remote person.
             */
            $scope.isMessageFromCurrentPerson = function (remoteMessage) {

                var currentPerson = $scope.RemotePersonService.getCurrentRemotePerson();

                return currentPerson ? currentPerson.getId() === remoteMessage.getSender().getId() : false;
            };

            $scope.WebRtcClient.on('recv', function (event) {

                var message = event.message;

                var remotePerson = message.getSender();

                /**
                 * If we get a ping that a person is trying to text contact us, display a person within the person selector.
                 * Make sure that the ping is not from a person that is already within the person selector.
                 * @this $scope
                 */
                if (message.getType() === 'x-msg-REMOTE-PERSON-CONNECTION-PING' && !this.isMessageFromCurrentPerson(message)) {

                    var that = this;

                    this.$timeout(function () {

                        that.personList.push({
                            displayName: remotePerson.getDisplayName(),
                            mediaState: 'pending',
                            personId: remotePerson.getId(),
                            isCurrentPerson: false,
                            isConnectionPing: true
                        });

                    });


                }
            }, $scope);


            /**
             * Grabs all current media sessions and adds them to a bound object that displays them on the front end.
             * The function also makes sure to register listeners on the media session in order to check  for if the list
             * of person should be updated.
             */
            $scope.updatePersonList = function () {

                Logger.debug('CallPersonSelectorController: updatePersonList: Updating the remote person list.');

                //Each session represents a connection to another person or a person within the person selector
                $scope.addedMediaSessions = $scope.WebRtcClient.getMediaSessions();

                //Clear the current list before creating a new one
                $scope.personList = [];

                var tempPersonList = [];

                var mediaSessionDisplayName=null;
                var mediaSessionState  =null;
                var mediaSessionPersonId =null;
                var currentPersonId =null;
                var isMediaSessionFromCurrentPerson =null;

                /**
                 * Each media session will represent a person within the person selector that is attempting
                 * to initiate a connection with the local user.
                 */
                for (var i = 0; i < $scope.addedMediaSessions.length; i++) {

                    mediaSessionDisplayName = $scope.addedMediaSessions[i].getDisplayName();
                    mediaSessionState = $scope.addedMediaSessions[i].getMediaState();
                    mediaSessionPersonId = $scope.addedMediaSessions[i].getChannel().getId();

                    currentPersonId = $scope.RemotePersonService.getCurrentRemotePerson() ? $scope.RemotePersonService.getCurrentRemotePerson().getId() : null;
                    isMediaSessionFromCurrentPerson = mediaSessionPersonId === currentPersonId;

                    tempPersonList.push({

                        displayName: mediaSessionDisplayName,
                        mediaState: mediaSessionState,
                        personId: mediaSessionPersonId,
                        isCurrentPerson: isMediaSessionFromCurrentPerson,
                        isConnectionPing: false
                    });
                }

                /**
                 * Needed to put in $timeout do to exception raised saying that
                 * apply was already in progress.
                 */
                $timeout(function () {
                    $scope.personList = tempPersonList;
                });


            };


            /**
             * Updates the current remote person to a new person. Updates both the model and the remote person service.
             * @param personId vline id of a registered remote person.
             */
            $scope.setAsCurrentRemotePerson = function (personId) {

                Logger.debug('CallPersonSelectorController: setAsCurrentRemotePerson: Setting person with id  ' +
                    $scope.personId + ' as the current remote client.');

                $scope.RemotePersonService.setCurrentRemotePerson(personId);

                /**
                 * If this function is called that means that the personId was selected within the view. We need to update
                 * the person model for all persons in order to allow the styles to reflect what person is currently selected.
                 */
                for (var i = 0; i < $scope.personList.length; i++) {
                    $scope.personList[i].isCurrentPerson = $scope.personList[i].personId === personId;

                    if ($scope.personList[i].isConnectionPing) {
                        //set the state to active
                        $scope.personList[i].mediaState = 'active';
                    }
                }

                var tempPersonList = $scope.personList;

                $timeout(function () {

                    $scope.personList = [];

                    $scope.personList = tempPersonList;

                    $scope.$apply();

                });

            };

        }]);
});