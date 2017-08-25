/**
 * Created by Ferkat on 8/25/17.
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


exports.config = {

    directConnect: false,

    baseUrl: '',

    capabilities: {
        'browserName': 'phantomjs',
        'phantomjs.binary.path': './node_modules/phantomjs/bin/phantomjs',
        'shardTestFiles': true,
        'chromeOptions': {
            args: ['--window-size=1920,1080']

        },
        maxInstances: 1,
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        //add your feature files here
    ],


    exclude: [
        //add tests you want to exclude from execution to here
    ],


    /**
     * Description
     * @method onPrepare
     * @return
     */
    onPrepare: function () {

        browser.ignoreSynchronization = true;
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should;
        global.EC = protractor.ExpectedConditions;

        var origFn = browser.driver.controlFlow().execute;
        browser.driver.controlFlow().execute = function () {
            var args = arguments;
            origFn.call(browser.driver.controlFlow(), function () {
                return protractor.promise.delayed(100);
            });

            return origFn.apply(browser.driver.controlFlow(), args);
        };


    },
    cucumberOpts: {
        keepAlive: false,
        ignoreUncaughtExceptions: true,
        strict: true,
        format: ['pretty'],
        require: [

            '../support/*.js',
            'main.step.js'],


    }
};

