/*
 ** @fileOverview  File contains an agular service that is used to interact with the WebRTC session
 * api.
 */
define(['angular', 'Logger', 'vline', './module'], function (ng, Logger, vline, servicesModule) {

    'use strict';

    Logger.info('Registering WebRtcClientService service.');

    servicesModule.factory('WebRtcClientService', ['$rootScope', 'CustomerServiceConfiguration',
        function ($rootScope, CustomerServiceConfig) {


            Logger.debug('WebRtcClientService: CustomerServiceConfig: ', CustomerServiceConfig);

            /**
             * Holds data and functions relevant to creating an HTML WebRTC session
             * @type {{WebRtcClientService}} Contains WebRTC application session state
             */
            var WebRtcClientService = {};


            /**
             * This represents the current vline person object which the customer service module is communicating with.
             * This is being added here in order to prevent the need for all sub modules to need to manually get a person.
             * Although it may not be technically necessary since  vline caches person objects
             * @type {vline.Person}
             * @memberOf WebRtcClientService
             */
            WebRtcClientService.currentRemotePerson = null;

            /**
             *Holds the vline client object that we use to listen to events and communicate with the vline service.
             * This initializes the client. This code runs before being imported into a module that is dependent on it.
             * @type {vline.Client} Contains a single point of reference for the vline client object
             * @memberOf WebRtcClientService
             */
            WebRtcClientService.webRtcClient = vline.Client.create({

                serviceId: CustomerServiceConfig.serviceId

            });

            /**
             * @memberOf WebRtcClientService
             * @type {string} Represents the service id that is given by the vline service in order to access the api
             */
            WebRtcClientService.serviceId = CustomerServiceConfig.serviceId;


            /**
             * @memberOf WebRtcClientService
             * @returns {string} String representing the service id of the application.
             */
            WebRtcClientService.getServiceId = function () {

                return this.serviceId;
            };

            /**
             * Quick check to see if the client has been created
             *If the service has emitted the CONSTANS.CLIENT_LOG_IN_EVENT then this is also true
             * @memberOf WebRtcClientService
             * @type {boolean}
             */
            WebRtcClientService.isClientCreated = false;

            /**
             * Will contain the session that is gotten after calling login
             *This does not seem to be the same object that is returned when calling webRtcClient.getSessions
             * @memberOf WebRtcClientService
             * @type {vline.session}
             */
            WebRtcClientService.clientLoginSession = null;

            /*Events that can be used by service users in order to know the state of the
             * overall application.
             * @memberOf WebRtcClientService
             */
            WebRtcClientService.CONSTANTS = {
                CLIENT_CREATED_EVENT: 'WebRtcClientService.CLIENT_CREATED_EVENT',
                CLIENT_LOG_IN_EVENT: 'WebRtcClientService.CLIENT_LOG_IN_EVENT',
                CLIENT_LOG_IN_FAILED_EVENT: 'WebRtcClientService.CLIENT_LOG_IN_FAILED_EVENT'
            };


            /**
             * Returns a reference to the shared Web RTC Client
             * @memberOf WebRtcClientService
             * @returns {vline.Client}
             */
            WebRtcClientService.getClient = function () {
                return this.webRtcClient;
            };


            /**
             *Replaces the shared client reference within the service
             * @memberOf WebRtcClientService
             * @param client {vline.Client} A vline client object used to log in and get sessions
             */
            WebRtcClientService.setClient = function (client) {
                this.webRtcClient = client;
            };

            /**
             *The function returns the log in state of the WebRtc Service
             * @memberOf WebRtcClientService
             * @returns {true | false} Returns true if the client is logged in. False if if the client
             * has not been created or if not logged in
             */
            WebRtcClientService.isLoggedIn = function () {

                if (this.isClientCreated()) {

                    return this.webRtcClient.isLoggedIn();

                } else {
                    return false;
                }
            };


            /**
             * Function that sets the state of the service as being initialized
             * The function also emits an even notifying all service users and listeners
             * that the client has been created.
             * @memberOf WebRtcClientService
             * @param isCreated {boolean} stat the represents if a client has been initialed
             */
            WebRtcClientService.setIsClientCreated = function (isCreated) {

                this.isClientCreated = isCreated;

                if (isCreated) {
                    this.notifyEvent(this.CONSTANTS.CLIENT_CREATED_EVENT);
                }
            };


            /**
             * Returns true if the local client has been created, false if otherwise
             * @memberOf WebRtcClientService
             * @returns {boolean|*|Function}
             */
            WebRtcClientService.getClientCreated = function () {
                return this.isClientCreated;
            };


            /**
             * Function that will notify all service listeners of an event
             * @memberOf WebRtcClientService
             * @param eventName {WebRtcClientService.CONSTANT}
             */
            WebRtcClientService.notifyEvent = function (eventName) {

                Logger.debug('WebRtcClientService: notifyEvent: ' + eventName);

                $rootScope.$broadcast(eventName);

            };

            /**
             * Sets the current client logged in session.
             * @memberOf  WebRtcClientService
             * @param newLoginSession {vline.Session} A session that represents a connection to the vline api
             */
            WebRtcClientService.setClientLoginSession = function (newLoginSession) {

                this.clientLoginSession = newLoginSession;
            };

            /**
             * Returns the client login session for the current client.
             * @memberOf WebRtcClientService
             * @returns {vline.Session}
             */
            WebRtcClientService.getClientLoginSession = function () {

                return this.clientLoginSession;
            };


            /**
             * Will notify all service users that the client  has logged in and that there
             * a session available
             * @memberOf WebRtcClientService
             */
            WebRtcClientService.notifyClientLogIn = function () {

                this.notifyEvent(this.CONSTANTS.CLIENT_LOG_IN_EVENT);
            };


            /**
             * Will notify all service users that the client has failed to login
             * @memberOf WebRtcClientService
             */
            WebRtcClientService.notifyClientLogInFailed = function () {

                this.notifyEvent(this.CONSTANTS.CLIENT_LOG_IN_FAILED_EVENT);
            };


            return WebRtcClientService;

        }]);


});