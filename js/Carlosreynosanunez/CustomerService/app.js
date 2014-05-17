/*
 Purpose: This file will bootstrap all necessary angular modules (controller etc.) and return the bootstrapped
 angular application
 @angular
 */
define(['angular','Logger', './controllers/index','./directives/index','./services/index'], function (ng,Logger) {
    'use strict';

    Logger.info('Including angular app dependencies');

   var app=ng.module('app',['app.controllers','app.directives','app.services']);

    app.value('CustomerServiceConfiguration',window.Carlosreynosanunez_CustomerService_Config);

    return app;
});