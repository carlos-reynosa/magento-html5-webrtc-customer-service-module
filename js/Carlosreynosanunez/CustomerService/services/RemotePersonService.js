/*
 ** @fileOverview  File contains an agular service that is used to interact with the WebRTC session
 * api.
 */
define(['angular', 'Logger', 'vline', './module'], function (ng, Logger, vline, servicesModule) {

    'use strict';

    Logger.info('Registering RemotePersonService service.');

    servicesModule.factory('RemotePersonService', ['$rootScope', 'CustomerServiceConfiguration','WebRtcClientService',
        function ($rootScope, CustomerServiceConfig, WebRtcClientService) {


            Logger.debug('RemotePersonService: CustomerServiceConfig: ', CustomerServiceConfig);

            /**
             *
             * @type {{RemotePersonService}}
             */
            var RemotePersonService = {};

            /**
             *
             * @type {vline.Client}
             */
            var WebRtcClient=WebRtcClientService.getClient();

            /**
             *Contains constants for the RemotePersonService.
             * @memberOf RemotePersonService
             */
            RemotePersonService.CONSTANTS = {};

            /**
             * Represents an even that should be emitted when the person within this service has been changed.
             * TODO:Event name should be namespaced.
             * @type {string} Called if the services current person has been set or changed.
             * @memberOf RemotePersonService.CONSTANTS
             */
            RemotePersonService.CONSTANTS.REMOTE_PERSON_CHANGE = 'REMOTE_PERSON_CHANGE';

            /**
             * Represents an event that shoul be emitted when the there is not current person and the current person
             * value is set to null.
             * @type {string}
             * @memberOf RemotePersonService.CONSTANTS
             */
            RemotePersonService.CONSTANTS.REMOTE_PERSON_CLEARED = 'REMOTE_PERSON_CLEARED';

            /**
             * Will contain a reference to the current person that the customer service module is communicating with
             * @type {vline.Person}
             */
            RemotePersonService.currentPerson = null;


            RemotePersonService.getRootScope=function(){
               return $rootScope;
            };

            RemotePersonService.clearCurrentRemotePerson=function(){

                this.currentPerson=null;

                this.getRootScope().$broadcast(this.CONSTANTS.REMOTE_PERSON_CLEARED);

            };

            /**
             * Accepts a person id and returns a promise of a person. When the method gets the person, the person becomes
             * the new current person within the service. The method also broadcasts an event letting other components
             * know that the current person has changed.
             * @arg vline.Person vline person type
             * @memberOf RemotePersonService
             * @param {vline.Person} newPerson A vline person object
             */
            RemotePersonService.setCurrentRemotePerson = function (remotePersonId) {


                //Done when  we get
                //RemotePersonService.currentPerson = newPerson;

                var personPromise=WebRtcClientService.getClientLoginSession().getPerson(remotePersonId);

                personPromise.done(function(person){

                    this.currentPerson=person;

                    this.getRootScope().$broadcast(this.CONSTANTS.REMOTE_PERSON_CHANGE, person);

                },this);

                return personPromise;

                //emit broadcast to all listeners that the current person that we are communicating with has changed
            };



            /**
             * Returns the currently set remote person within the service.
             * @returns {vline.person}
             * @memberOf RemotePersonService
             */
            RemotePersonService.getCurrentRemotePerson = function () {

                return RemotePersonService.currentPerson;
            };


            return RemotePersonService;

        }]);


});