/**
 * Helper class intended to be used by test that need to compile templates. The class  takes a list of file names and
 * creates an object for each filename containing a full path to the template relative to the magento instillation and
 * the path of the template within the template cache.
 */
define('TestTemplateCacheList', ['angular'], function () {

    'use strict';

    /**
     *Class to manage a list of test templates.
     * @type TestTemplateCacheList
     */
    function TestTemplateCacheList(config) {


        /**
         * List containing objects representing paths used for template.
         * This is outside the conditional because it should be initialized with an empty list regardless of
         * configuration.
         * @type {Array}
         */
        this.templateList = [];

        if (config) {


            if (config.templateCachePathPrefix) {
                this.templateCachePathPrefix = config.templateCachePathPrefix;
            } else {
                this.templateCachePathPrefix = this.CONSTANTS.DEFAULTS.TEMPLATE_CACHE_PATH_PREFIX;
            }

            if (config.templateAbsolutePathPrefix) {
                this.templateAbsolutePathPrefix = config.templateAbsolutePathPrefix;
            } else {
                this.templateAbsolutePathPrefix = this.CONSTANTS.DEFAULTS.TEMPLATE_ABSOLUTE_PATH_PREFIX;
            }

            if (config.templateList) {

                this.buildTemplateFilePaths(config.templateList);

            }
        } else {


            this.templateCachePathPrefix = this.CONSTANTS.DEFAULTS.TEMPLATE_CACHE_PATH_PREFIX;

            this.templateAbsolutePathPrefix = this.CONSTANTS.DEFAULTS.TEMPLATE_ABSOLUTE_PATH_PREFIX;

        }


    }


    /**
     * Holds class constant.
     * @memberOf TestTemplateCacheList
     */
    TestTemplateCacheList.prototype.CONSTANTS = {

    };

    /**
     * Holds constant default class values.
     * @type {{}}
     * @memberOf TestTemplateCacheList.CONSTANTS
     */
    TestTemplateCacheList.prototype.CONSTANTS.DEFAULTS = {

    };

    /**
     * Holds the prefix path for where a template is stored within the angular template cache service.
     * @type {string}
     * @memberOf TestTemplateCacheList.CONSTANTS.DEFAULTS
     */
    TestTemplateCacheList.prototype.CONSTANTS.DEFAULTS.TEMPLATE_CACHE_PATH_PREFIX = 'templates/';

    /**
     * Holds the absolute path prefix for templates relative to where they are stored within the magento instillation.
     * @type {string}
     * @memberOf TestTemplateCacheList.CONSTANTS.DEFAULTS
     */
    TestTemplateCacheList.prototype.CONSTANTS.DEFAULTS.TEMPLATE_ABSOLUTE_PATH_PREFIX = '/js/Carlosreynosanunez/CustomerService/templates/';


    TestTemplateCacheList.prototype.getTemplateCachePathPrefix = function () {
        return this.templateCachePathPrefix;
    };

    /**
     * Iterates through a list of template file names and builds a list of objects that contains the templates
     * cache path and absolute path.
     * @param listofTemplateFilenames List of template filenames.
     * @memberOf TestTemplateCacheList
     */
    TestTemplateCacheList.prototype.buildTemplateFilePaths = function (templateFileNamesList) {


        for (var i = 0; i < templateFileNamesList.length; i++) {

            this.addTemplate(templateFileNamesList[i]);
        }


    };

    TestTemplateCacheList.prototype.getTemplateAbsolutePathPrefix = function () {

        return this.templateAbsolutePathPrefix;
    };

    /**
     *
     * @param templateFileName
     * @returns {*}
     */
    TestTemplateCacheList.prototype.getTemplateCachePath = function (templateFileName) {

        return this.getTemplateCachePathPrefix() + templateFileName;

    };

    /**
     * Gets the full path of a template relative to the magento instillation.
     * @param templateFileName File name ending in .html that represents an angular template.
     * @returns {string} The full path of a template file relative to the magento instillation.
     */
    TestTemplateCacheList.prototype.getTemplateAbsolutePath = function (templateFileName) {

        return this.getTemplateAbsolutePathPrefix() + templateFileName;
    };

    /**
     * Adds a template item to the list of templates.
     * @memberOf TestTemplateCacheList
     */
    TestTemplateCacheList.prototype.addTemplate = function (templateFileName) {

        this.templateList.push({

            templateFileName: templateFileName,
            templateCachePath: this.getTemplateCachePath(templateFileName),
            templateAbsolutePath: this.getTemplateAbsolutePath(templateFileName)
        });
    };

    /**
     * Returns a cache template object that contains the templates file name, absolute path relative to the magento
     * instillation, and the templates path within the magento template cache.
     * @returns {*}
     * @memberOf TestTemplateCacheList
     */
    TestTemplateCacheList.prototype.getTemplateList = function () {


        return this.templateList;
    };


    return TestTemplateCacheList;

});