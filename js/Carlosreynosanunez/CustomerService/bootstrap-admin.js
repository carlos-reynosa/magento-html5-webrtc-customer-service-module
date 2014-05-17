define(['require',
    'angular',
    'Logger',
    'vline',
    'app-admin'
], function (require, ng, Logger, vline) {

    'use strict';

    Logger.info("Configuring angular bootstrap for admin.");

    require(['domReady!'], function (document) {

        ng.bootstrap(document, ['app-admin']);


    });

});