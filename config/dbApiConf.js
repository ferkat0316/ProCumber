/**
 * Created by Ferkat on 8/25/17.
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);


exports.config = {
    directConnect: false,
    capabilities: {
        'browserName': 'phantomjs',
        /*
         * Can be used to specify the phantomjs binary path.
         * This can generally be ommitted if you installed phantomjs globally.
         */
        'phantomjs.binary.path': require('phantomjs-prebuilt').path,
        /*
         * Command line args to pass to ghostdriver, phantomjs's browser driver.
         * See https://github.com/detro/ghostdriver#faq
         */
        'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],
        'shardTestFiles': false,
        'maxInstances': 1
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        '../test_suite/features/api/sampleWeatherApiTest.feature'
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
    },
    cucumberOpts: {
        keepAlive: false,
        strict: true,
        require: [
            '../test_suite/stepDefinitions/api/*.js',
            '../support/*.js',
            'main.step.js'
        ],

        tags: '@sampleTestOnWeatherApi'

    }
};

