require.config({

    paths:{

        'domReady': './bower_components/requirejs-domready/domReady',
        'angular': './bower_components/angular/angular',
        'jsLogger': './bower_components/js-logger/src/logger.min',
        'vline' : './bower_components/vline/vline',
        'Logger': './libs/Logger',
        'LogLevel':'./libs/VariableLogLevel'

    },
    shim:{

        'angular':{
            exports : 'angular'
        },
        'vline' :{

            exports:'vline'
        }
    },

    deps: ['./bootstrap-admin']
});