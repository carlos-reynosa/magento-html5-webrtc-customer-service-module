define(['require',
    'angular',
    'Logger',
    'vline',
    'app'
], function (require, ng, Logger,vline) {

    'use strict';

    Logger.info("Configuring angular bootstrap.");

    require(['domReady!'], function(document) {

        ng.bootstrap(document,['app']);



    });

});