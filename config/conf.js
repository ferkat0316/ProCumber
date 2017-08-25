/**
 * Created by Ferkat on 8/25/17.
 */
exports.config = {
    //if set to true, tests will execute on local browsers
    directConnect: true,


    //setting browser capabilities
    capabilities: {
        'browserName': (process.env.TEST_BROWSER_NAME || 'chrome'),
        'version': (process.env.TEST_BROWSER_VERSION || 'ANY'),
        'marionette': true,
        'chromeOptions': {
            args: ['--window-size=1920,1080']
        },
        'shardTestFiles': true,
        'maxInstances': 3
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    ignoreUncaughtExceptions: true,


    specs: [
        //add your spc files here
    ],

    exclude: [
        //add tests you want to exclude from execution to here
    ],

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
            'main.step.js'
        ],


        // tags: '~@skip'


    }

}