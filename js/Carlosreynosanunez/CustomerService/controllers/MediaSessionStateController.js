/*
 **Purpose: This controller  updates the style and label for the status of a media session. The controller checks
 * against the currently set global person in order to update with the correct values.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller MediaStreamStateController controller.');

    controllersModule.controller('MediaSessionStateController', ['$scope', 'WebRtcClientService', 'RemotePersonService',
        function ($scope, WebRtcClientService, RemotePersonService) {


            $scope.WebRtcClientService = WebRtcClientService;
            $scope.WebRtcClient = WebRtcClientService.getClient();

            $scope.RemotePersonService = RemotePersonService;

            $scope.mediaSessionStateStyleMapping={

                'pending':{style: 'label-default',label:'pending'},
                'incoming': {style:'label-warning',label:'incoming'},
                'outgoing': {style:'label-primary',label:'outgoing'},
                'connecting':{style: 'label-info',label:'connecting'},
                'active':{style:'label-success',label:'active'},
                'paused':{style:'label-default',label:'paused'},
                'closed':{style:'label-danger',label:'closed'},
                'disconnected':{style:'label-danger',label:'disconnected'}
            };

            $scope.mediaState = 'closed';

            /**
             * Returns true if parameter media session is from the currently set person, false otherwise.
             * @param vline.MediaSession
             * @returns {boolean}
             */
            $scope.isCurrentPersonMediaSession = function (mediaSession) {

                var currentRemotePerson = $scope.RemotePersonService.getCurrentRemotePerson();

                var currentRemotePersonId = currentRemotePerson.getId();

                var sessionId = mediaSession.getChannel().getId();

                return currentRemotePersonId === sessionId;

            };

            /**Media
             * Updates the media state if the mediaSession contains the media type
             * of the
             * @param mediaSession
             * @param mediaState
             */
            $scope.updateMediaStateView = function (mediaSession, mediaState) {

                if (
                    ($scope.streamType === 'video' && mediaSession.hasVideo() ||
                        $scope.streamType === 'audio' && mediaSession.hasAudio())) {


                    $scope.mediaState = mediaState;
                    $scope.$apply();

                    $scope.$broadcast('MediaSessionSateController:MediaStateChange',mediaState);
                }
            };

            /**
             * We need to know when a media session has been added to listen for changes in its state.
             */
            $scope.WebRtcClient.on('add:mediaSession', function (event) {

                var mediaSession = event.target;

                var mediaSessionFromCurrentPerson = $scope.isCurrentPersonMediaSession(mediaSession);

                /**We only care to listen to changes if the media session is form the current remote person
                 * This is to make sure that other incoming media session arent' affecting this widget.
                 */
                if(mediaSessionFromCurrentPerson){

                    mediaSession.on('change:mediaState', function (event) {

                        this.updateMediaStateView(event.currentTarget, event.val);

                    }, this);
                }
            }, $scope);

        }]);
});