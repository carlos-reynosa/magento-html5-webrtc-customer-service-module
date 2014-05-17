define('Logger',['jsLogger','LogLevel'],function(logger,logLevel){

    'use strict';

    logger.useDefaults();
    logger.setLevel(logLevel);

    return logger;
});