/**
 * Created by Ferkat on 8/25/17.
 */
var Cucumber = require('cucumber')
var fs = require('fs');
var conf = require('../config/config').config;




/**
 * Description
 * @method hooks
 * @return 
 */
var hooks = function () {
    "use strict";


    this.registerHandler('BeforeFeature', {timeout: 10 * 5000}, function (event) {
            return browser.get((conf.baseUrl));
    });


    this.After('Successfully Applied Hooks', function (scenario, callback) {
        if (scenario.isFailed()) {
            browser.takeScreenshot().then(function (base64png) {
                var decodedImage = new Buffer(base64png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');
                callback();
            }, function (err) {
                return callback(err);
            });
        }
        browser.driver.close();
        callback();
    });

    this.registerHandler('StepResult', function (stepResult, callback) {
        allure.feature(stepResult.fullName);

        if (stepResult.getStatus() == 'failed') {
            allure.story("Something gone wrong!");

            browser.takeScreenshot().then(function (png) {
                allure.createAttachment('Screenshot', function () {
                    return new Buffer(png, 'base64')
                }, 'image/png')();
                callback();
            });

        } else {
            allure.story("You're good to go!");
            callback();
        }
    });

    // this.registerHandler('AfterStep', function (step, callback) {
    //     var loggedMessages = logger.getMessages();
    //     if (loggedMessages.length > 0){
    //         var loggedMessage = '';
    //         for (var i =0; i < loggedMessages.length ; i++){
    //             loggedMessage += loggedMessages[i] + '\n';
    //         }
    //         //loggedMessage = "\ send<html><head></head><body><h1>HELLO WORLD</h1></body></html>"
    //         allure.createAttachment('Accessibility testing results for: \"' + step.getName() + '\ ', function() { return loggedMessage}, 'text/html')();
    //
    //     }
    //     callback();
    // });

};
module.exports = hooks;