/**
 * Created by Ferkat on 8/25/17.
 */

//  The url for the test to execute is set as variable, if you need to run on
// Prod environment you need to set url=prod and if you need to run on IMP0
// you need to set url = imp0 on line 12


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
require('dotenv').load();

exports.config = {

    directConnect: false,

    baseUrl: '',

    sauceUser: process.env.SAUCELABS_USER_NAME,
    sauceKey: process.env.SAUCELABS_KEY,

    //We can run 4 browsers on same time on Saucelabs, so commented out some browser names
    // Capabilities to be passed to the webdriver instance.
    // Right now we have Win 10, Win 8.1, OSX 10.10
    // and latest 2 versions for each OS
    multiCapabilities: [

        ////////////////------------Windows 10------------////////////////
        //
        // {
        //     browserName: 'firefox',
        //     version: '52',
        //     platform: 'Windows 10',
        //     name: "firefox54-Windows 10",
        //     shardTestFiles: true,
        //     maxInstances: 1,
        //
        //     'build': 123
        // },

        // {
        //     browserName: 'firefox',
        //     version: '53',
        //     platform: 'Windows 10',
        //     name: "firefox53-Windows 10",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        // {
        //     browserName: 'firefox',
        //     version: '52',
        //     platform: 'Windows 10',
        //     name: "firefox52-Windows 10",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },

        {
            browserName: 'chrome',
            version: '58',
            platform: 'Windows 10',
            name: "Chrome54-Windows 10",
            shardTestFiles: true,
            maxInstances: 25,

            'build': 123
        },
        //
        // {
        //     browserName: 'chrome',
        //     version: '53',
        //     platform: 'Windows 10',
        //     name: "Chrome53-Windows 10",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // {
        //     browserName: 'Microsoft edge',
        //     version: '14.14393',
        //     platform: 'Windows 10',
        //     name: "Edge-Windows 10",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },

        // {
        //     browserName: 'Internet explorer',
        //     version: '11',
        //     platform: 'Windows 10',
        //     name: "IE-Windows 10",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },

        // ////////////////------------Windows 8.1------------////////////////
        //
        // {
        //     browserName: 'firefox',
        //     version: '50',
        //     platform: 'Windows 8.1',
        //     name: "firefox50-Windows 8.1",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // {
        //     browserName: 'firefox',
        //     version: '49',
        //     platform: 'Windows 8.1',
        //     name: "firefox49-Windows 8.1",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // {
        //     browserName: 'chrome',
        //     version: '54',
        //     platform: 'Windows 8.1',
        //     name: "Chrome54-Windows 8.1",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // {
        //     browserName: 'chrome',
        //     version: '53',
        //     platform: 'Windows 10',
        //     name: "Chrome53-Windows 10",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // {
        //     browserName: 'IE',
        //     version: '11',
        //     platform: 'Windows 8.1',
        //     name: "IE11-Windows 8.1",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // ////////////////------------OSX 10.11------------////////////////
        //
        // {
        //     browserName: 'firefox',
        //     version: '47',
        //     platform: 'OS X 10.11',
        //     name: "firefox-osx10.11",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // {
        //     browserName: 'firefox',
        //     version: '49',
        //     platform: 'OS X 10.11',
        //     name: "firefox-osx10.11",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // {
        //     browserName: 'chrome',
        //     version: '54',
        //     platform: 'OS X 10.11',
        //     name: "Chrome-OSX10.11",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // {
        //     browserName: 'chrome',
        //     version: '53',
        //     platform: 'OS X 10.11',
        //     name: "Chrome-OSX10.11",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // },
        //
        // {
        //     browserName: 'safari',
        //     version: '10',
        //     platform: 'OS X 10.11',
        //     name: "Chrome-OSX10.11",
        //     shardTestFiles: true,
        //     maxInstances: 25,
        //
        //     'build': 123
        // }


    ],


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