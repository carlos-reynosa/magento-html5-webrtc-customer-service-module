/*
 Defines a controller and includes the controller
 module definition as a dependency
 */

//noinspection JSHint
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.info('Registering VideoCommunicationController controller.');

    controllersModule.controller('VideoCommunicationController', ['$scope', '$sce', 'WebRtcClientService', 'CustomerServiceConfiguration', 'RemotePersonService', '$timeout', function ($scope, $sce, WebRtcClientService, appConfig, RemotePersonService, $timeout) {


        /**
         * Allows us to listen to when a new media session connection is available.
         * @type {vline.Client}
         */
        $scope.WebRtcClient = WebRtcClientService.getClient();

        /**
         * Represents the source of the currently displayed video element.
         * @type {string} The data that represents a video.
         */
        $scope.remoteVideoStreamSource = 'null';

        $scope.appView = appConfig.viewType;

        /**
         * Lets us check if the media session that is closing is from the currently set person. Thus allowing
         * us to only update the video source if the media session that is changing state is from the current remote person.
         * @type {RemotePersonService}
         */
        $scope.RemotePersonService = RemotePersonService;

        /**
         *
         * @type {vline.MediaStream} Holds functions for generating a video or audio element
         */
        $scope.mediaStream = 'null';

        //Needed in order to validate the stream URL within angular
        $scope.$sce = $sce;


        /**
         *The function sets the data stream of the currently displayed video element.
         * @param Vline.MediaStream Object containing data being sent between two users.
         */
        $scope.updateVideoSource = function (stream) {

            $scope.remoteVideoStreamSource = $scope.$sce.trustAsResourceUrl(stream.createVideoElement().src);

            $scope.$apply();
        };

        /**
         * Updates the current media if it has the correct corresponding media.
         * @param Vline.MediaStream
         */
        $scope.updateMediaSources = function (stream) {

            if (stream.hasVideo()) {

                Logger.debug('VideoController:updateMediaSources: Getting active video stream.');

                $scope.updateVideoSource(stream);
            } else {
                Logger.debug('VideoController:updateMediaSources: Remote stream does not have video.');
            }

        };

        /**
         * Adds handlers for a given media session.
         * @param Vline.MediaSession
         */
        $scope.registerMediaSessionListeners = function (mediaSession) {


            /**
             * Lets us know that data is flowing in from a mediaSession and we can get a reference to that stream
             * and create audio and video. When the media session is sending data update the video element
             * to display the flowing data (video).
             * TODO: Should only update the media source if the remote stream is from the currently set person.
             */
            mediaSession.on('enterState:active', function (event) {



                //Assumes we only have one stream at a time
                var remoteStream = event.target.getRemoteStreams()[0];

                Logger.debug('VideoController: Media session entered active state. Attempting to update video media sources.');

                //Add check that the remote stream is from the current person
                this.updateMediaSources(remoteStream);


            }, $scope);

            mediaSession.on('enterState:closed', function (event) {
                Logger.debug('Event: ', event);

                var that = this;

                //TODO: Before closing make sure the event came from a media session of the current person
                /**
                 * @this $scope
                 */
                this.RemotePersonService.getCurrentRemotePerson().release();
                $timeout(function () {

                    that.remoteVideoStreamSource = 'null';
                });

            }, $scope);


        };


        /**
         * When a new remote client is attempting make a connection with the local client, we receive a new
         * incoming media session. When we get the session make sure that we register the correct handlers on it.
         */
        $scope.WebRtcClient.on('add:mediaSession', function (event) {


            Logger.info('VideoController: New media session added');


            var mediaSession = event.target;


            $scope.registerMediaSessionListeners(mediaSession);


        }, $scope);

    }]);
});