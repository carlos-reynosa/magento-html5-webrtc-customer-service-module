/*
 **Purpose: This controller should define the proper label for each  status depending on the media state
 * as well as define the correct css depending on the state.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller IncomingPersonCallStatusController controller.');

    controllersModule.controller('IncomingPersonCallStatusController', ['$scope', function ($scope) {


        /**
         * Possible MediaSession States within scope.status
         *
         * @link https://vline.com/developer/docs/vline.js/vline.MediaStates
         * Media states and relative css lable
         * 'pending' -  label-default
         * 'incoming' - label-warning
         * 'outgoing' -  label-primary
         * 'connecting' label-info
         * 'active' - label-success
         * 'paused' - label-default
         * 'closed' - label-danger
         * 'disconnected' -  label-danger
         */

        $scope.incomingPersonCallStateStyleMapping={

            'pending':{style: 'label-default',label:'pending'},
            'incoming': {style:'label-warning',label:'incoming'},
            'outgoing': {style:'label-primary',label:'outgoing'},
            'connecting':{style: 'label-info',label:'connecting'},
            'active':{style:'label-success',label:'active'},
            'paused':{style:'label-default',label:'paused'},
            'closed':{style:'label-danger',label:'closed'},
            'disconnected':{style:'label-danger',label:'disconnected'}
        };

        $scope.callState=$scope.status;

    }]);
});