/*
 ** @fileOverview
 */
define(['angular', 'Logger', 'vline', './module'], function (ng, Logger, vline, servicesModule) {

    'use strict';

    Logger.info('Registering ConnectionStateViewConstants.');

    servicesModule.factory('ConnectionStateViewConstants', [function () {

            return {

                'disconnected': {
                    label: 'Client Disconnected',
                    style: 'label-default'
                },

                'connecting': {
                    label: 'Client Connecting...',
                    style: 'label-info'
                },

                'connected': {
                    label: 'Client Connected!',
                    style: 'label-success'
                },

                'disconnecting': {
                    label: 'Client Disconnecting...',
                    style: 'label-warning'
                },

                'error': {
                    label: 'Error Connecting Client to vline!',
                    style: 'label-error'
                }
            };

        }]);


});