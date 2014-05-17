/*
 Purpose: This file will bootstrap all necessary angular modules (controller etc.) and return the bootstrapped
 angular application
 @angular
 */
define(['angular','Logger', './controllers/index','./directives/index','./services/index'], function (ng,Logger) {
    'use strict';

    Logger.info('Including angular app dependencies for admin app');


    var app=ng.module('app-admin',['app.controllers','app.directives','app.services']);

    //Add configuration values to the application
    app.value('CustomerServiceConfiguration',window.Carlosreynosanunez_CustomerService_Config);


    return app;

});