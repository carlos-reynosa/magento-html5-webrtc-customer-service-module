//Get all test files
var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/ConfigSpec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({

    //used by the karma server to get the right files form the built in server
    baseUrl: '/base/',

    /*should match those found within the main files of the main app
   ** This is due to the fact that other requirejs modules might depend on them
   * This also true for shims
    ***/
    paths: {
        'domReady': './bower_components/requirejs-domready/domReady',
        'angular': './bower_components/angular/angular',
        'jsLogger': './bower_components/js-logger/src/logger.min',
        'vline' : './bower_components/vline/vline',
        'Logger': './libs/Logger',
        'LogLevel':'./libs/VariableLogLevel',
        'angular-mocks':'./bower_components/angular-mocks/angular-mocks',
        'TestTemplateCacheList':'./test/libs/TestTemplateCacheList'
    },
    shim: {
        'angular':{
            exports : 'angular'
        },
        'vline' :{

            exports:'vline'
        },
        'angular-mocks':{deps:['angular']}
    },
    //include all the test files
    deps: tests,

    callback: window.__karma__.start
});