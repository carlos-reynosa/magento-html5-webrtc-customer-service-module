/*
Purpose: Module returns a log level that will be used throughout the system.
This is the main point of reference where the behavior of the logger can be
changed. This file will be ignored by the git instillation since it will be

PRE-DEFINED LOG LEVELS:

 Logger.DEBUG
 Logger.INFO
 Logger.WARN
 Logger.ERROR
 Logger.OFF
 Logger.ALL

 */
define('LogLevel',['jsLogger'],function(Logger){


    'use strict';

    return  Logger.OFF;

});