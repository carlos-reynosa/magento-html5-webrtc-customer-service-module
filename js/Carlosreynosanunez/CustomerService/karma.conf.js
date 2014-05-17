// Karma configuration
// Generated on Mon Jan 13 2014 13:08:38 GMT-0800 (PST)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: './',

        // frameworks to use
        frameworks: ['jasmine', 'requirejs'],

        // list of files / patterns to load in the browser
        files: [
            /*This had to be added because the preprosessor pulugins
             *were complaining that angular was not defined*/
            './bower_components/angular/angular.js',
            './templates/**/*.html',
            {pattern: './controllers/**/*js', included: false},
            {pattern: './directives/**/*js', included: false},
            {pattern: './filters/**/*js', included: false},
            {pattern: './services/**/*js', included: false},
            {pattern: './libs/*js', included: false},
            {pattern: './test/spec/**/*.js', included: false},
            {pattern: './test/libs/**/*.js', included: false},
            {pattern: './bower_components/**/*.js', included: false},
            './test/test-main.js'
        ],

        // list of files to exclude
        exclude: [
            './main.js',
            './main-admin.js',
            './bootstrap.js',
            './bootstrap-admin.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['mocha'],


        // web server port

        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,


        ngHtml2JsPreprocessor: {

            moduleName: 'DirectiveTemplates'

        },
        /**
         *html2js needed to be included manually within the plugins instead of through the preprocessor property.
         *This is due to the fact that html2js was not running when defined through he preprocessor property.
         * Because we defined html2js within the plugins property we also needed to manually define all other used plugins.
         * */
        plugins: ['karma-phantomjs-launcher', 'karma-ng-html2js-preprocessor', 'karma-jasmine', 'karma-mocha-reporter', 'karma-requirejs']

    });
};
