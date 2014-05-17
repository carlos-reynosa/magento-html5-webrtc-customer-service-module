/*
 ** Purpose: This test is meant to test a configuration object that lets the front-end application know what
 * features should be visible and usable by the application. The configuration object is normally produced by the
 * server and consumed by the front-end application. This test sets the configuration object to only display
 * the audio communication widget. It then makes sure that the browser renders the correct video communication
 * widget HTML only.
 */
define(['angular', 'TestTemplateCacheList', 'angular-mocks', 'directives/index', 'controllers/index', 'services/index'], function (ng, TestTemplateCacheList) {

    ng.module('AppConfig', []);

    //Include our testing helper class as a service
    ng.module('TestTemplateCacheList', []);
    ng.module('TestTemplateCacheList').value('TestTemplateCacheList', TestTemplateCacheList);


    describe('Test that a configuration containing the Video Communication widget only, renders the video widget and no other' +
        ' widget within the browser:', function () {

        var $compile;
        var $rootScope;
        /**
         * The function gets an html object and a list of widget features
         * that should be present within the html. The function returns
         * an object containing as keys the features that are rendered
         * and visible within the HTML
         * @param compiledHtml
         * @param featureList
         */
        function getAppHtmlHasFeature(compiledHtml,featureList){

            var rootHtmlChildren=compiledHtml.children();

            var hasFeatureList={};

            for(var i=0;i<rootHtmlChildren.length;i++){

                var child=ng.element(rootHtmlChildren[i]);

                if(child.attr('ng-repeat') === 'featureType in featuresVisible'){


                    var feature=child.children().children().children().attr('ng-switch-when');

                    for(var j=0;j<featureList.length;j++){

                        if(feature === featureList[j]){


                            hasFeatureList[feature]=true;

                        }


                    }

                }

            }

            return hasFeatureList;
        }

        beforeEach(function () {

            //Sets up the configuration object normally produced by the server for the front-end application
            ng.module('AppConfig').value('CustomerServiceConfiguration',{
                viewType:'frontend',
                featuresVisible:['video']
            });

            module('app.directives', 'app.controllers', 'app.services', 'AppConfig', 'TestTemplateCacheList', 'DirectiveTemplates');

        });

        beforeEach(inject(function (_$compile_, _$rootScope_, $templateCache, TestTemplateCacheList) {
            var template = null;

            var requiredTemplateFileNameList = [
                'CustomerService.html',
                'TextCommunicationTemplate.html',
                'TextCommunicationMessageLogTemplate.html',
                'TextCommunicationControlPanelTemplate.html',
                'TextCommunicationMessageTemplate.html',
                'CustomerServiceFeatureTemplate.html',
                'ClientLoginStatusTemplate.html',
                'ClientConnectionStateTemplate.html',
                'VideoCommunicationTemplate.html',
                'AudioCommunicationTemplate.html',
                'CallPersonSelectorTemplate.html',
                'StateIndicatorTemplate.html',
                'MediaSessionStateTemplate.html',
                'RemotePersonConnectionListTemplate.html',
                'RemotePersonTemplate.html',
                'IncomingPersonCallStatusTemplate.html'
            ];


            /**
             *
             * @type {TestTemplateCacheList}
             */
            var templateCacheList = new TestTemplateCacheList({templateList:requiredTemplateFileNameList});

            var templateFilePathsList = templateCacheList.getTemplateList();

            for (var i = 0; i < templateFilePathsList.length; i++) {

                /*
                 ** The html directive template that was turned into js by the
                 * html2js karma plugin stores the converted templates in
                 * the template cache.
                 */
                template = $templateCache.get(templateFilePathsList[i].templateCachePath);

                /*Now that we have a mapping to a reference, we need to trick
                 **Karma into thinking that the template is being served from
                 * Same directory as the one in the directive.
                 */
                $templateCache.put(templateFilePathsList[i].templateAbsolutePath, template);

            }


            $compile = _$compile_;
            $rootScope = _$rootScope_;

        }));


            it('Should render the video communication widget  ', function () {

                var preCompiledHtml = '<div data-customer-service-directive  ></div>';

                var compiledHtml = $compile(preCompiledHtml)($rootScope);


                $rootScope.$digest();


                var hasFeatureList=getAppHtmlHasFeature(compiledHtml,['video']);

                expect(hasFeatureList['video']).not.toBeFalsy();

            });


            it('Should not render the audio communication widget  ', function () {

                var preCompiledHtml = '<div data-customer-service-directive  ></div>';

                var compiledHtml = $compile(preCompiledHtml)($rootScope);


                $rootScope.$digest();


                var hasFeatureList=getAppHtmlHasFeature(compiledHtml,['audio']);

                expect(hasFeatureList['audio']).toBeFalsy();

            });

            it('Should not render the text communication widget  ', function () {

                var preCompiledHtml = '<div data-customer-service-directive  ></div>';

                var compiledHtml = $compile(preCompiledHtml)($rootScope);


                $rootScope.$digest();


                var hasFeatureList=getAppHtmlHasFeature(compiledHtml,['text']);

                expect(hasFeatureList['text']).toBeFalsy();

            });

            it('Should not render the person selector communication widget  ', function () {

                var preCompiledHtml = '<div data-customer-service-directive  ></div>';

                var compiledHtml = $compile(preCompiledHtml)($rootScope);

                $rootScope.$digest();

                var hasFeatureList=getAppHtmlHasFeature(compiledHtml,['person-selector']);

                expect(hasFeatureList['person-selector']).toBeFalsy();

            });





    });

});