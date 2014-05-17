/*
 **Purpose:The controller initializes the current style and label of the state indicator widget. The widget attains
 * the states and what styles and lables pertain to them through a mapping within one of its attributes. It also
 * attains the current state from one of its attributes.
 */
define(['angular', 'Logger', './module'], function (ng, Logger, controllersModule) {

    'use strict';

    Logger.debug('Registering controller StateIndicatorController controller.');

    controllersModule.controller('StateIndicatorController', ['$scope', function ($scope) {

        $scope.updateView=function(){
            $scope.statusLabelStyle = $scope.stateStyleMapping[$scope.currentState].style;
            $scope.statusLabel = $scope.stateStyleMapping[$scope.currentState].label;
        };

        $scope.updateView();

        $scope.$watch('currentState',function(newValue,oldValue){

            if(newValue !== oldValue){

                $scope.updateView();

            }

        });
    }]);
});