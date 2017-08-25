/**
 * Created by Ferkat on 8/25/17.
 */
'use strict';


var origFn = browser.driver.controlFlow().execute,
    //pg = require('pg'),
    light = require('./highlightElm'),
    userId;
var EC = protractor.ExpectedConditions;



module.exports = {

    go: function (url) {
        browser.manage().window().maximize();
        browser.get(url);
    },

    click: function (elm) {
        elm.click();
    },
    browserClick: function (elem) {
        browser.actions().mouseMove(elem).click();
    },

    fillField: function (elm, text) {
        elm.type(text);
    },

    type: function (elm, text) {
        elm.sendKeys(text);
    },

    grabTitle: function () {
        var pageTitle = browser.getTitle();
        return pageTitle;
    },

    verifyTitle: function (expectedTitle) {
        browser.getTitle().then(function (actualTitle) {
            expect(expectedTitle).to.equal(actualTitle);
            return true;
        })
    },

    moveTo: function (elm) {
        browser.actions().mouseMove(elm).perform();
        return true;
    },

    waitForElement: function () {
        browser.waitForAngular();
    },



    verifyText: function (elm, expectedText, callback) {
      if(!elm){
          return callback('No element provided!');
      }
      else{
              elm.getText().then(function (actualText) {
                  light.highlightElement(elm);
                  return callback(expect(expectedText).to.eventually.equal(actualText));
              })

      }


    },
    //
    // verifyText: function (elm, expectedText) {
    //     //light.highlightElement(elm);
    //     elm.getText().then(function (actualText) {
    //         return expect(expectedText).to.eventually.equal(actualText);
    //     })
    // },

    verifyTextFromList: function (elms, num, expectedText) {
        light.highlightElements(elms, num);
        elms.get(num).getText().then(function (actualText) {
            expect(expectedText).to.equal(actualText);
            return true;
        })
    },

    seeElement: function (elm) {
        expect(elm.isDisplayed);
    },

    grabTextFrom: function (elm) {
        var text = elm.getText();
        text.then(function (finalText) {
            return finalText;
        })
    },

    verifyPdf: function (pdfName) {
        browser.getAllWindowHandles().then(function (handles) {
            browser.switchTo().window(handles[1]).then(function () {
                expect(browser.getCurrentUrl()).to.eventually.equal(pdfName);
                browser.close();
                browser.switchTo().window(handles[0]);
            });
        })
    },

    setSpeed: function (time) {
        browser.driver.controlFlow().execute = function () {
            var args = arguments;

            // queue 100ms wait
            origFn.call(browser.driver.controlFlow(), function () {
                return protractor.promise.delayed(time);
            });

            return origFn.apply(browser.driver.controlFlow(), args);
        };
    },

    turnSyncOff: function () {
        browser.ignoreSynchronization = true;
    },

    turnSyncOn: function () {
        browser.ignoreSynchronization = false;
    },


    getDropDownListLength: function (elm) {

        //var dDownlength= elm.length;
        elm.then(function (items, done) {
            var dDownlength = items.length;
            console.log("Length of the drop down list: " + dDownlength);
            done;
            return dDownlength;
        });
    },

    selectDropDownElements: function (elm, num) {
        elm.then(function (items) {
            items[num].click();
        });

    },

    unselectDropDown: function (elm, num) {
        elm.then(function (items) {
            if (items[num].isSelected()) {
                items[num].click();
            }
        });
    },

    connectToDb: function (dbUserName, dbPassword, dbHost, dbName) {
        var connectionString = "postgres://" + dbUserName + ":" + dbPassword + "@" + dbHost + "/" + dbName;
        var pgClient = new pg.Client(connectionString);
        pgClient.connect();

        return pgClient;

    },

    extractUserId: function () {
        protractor.promise.controlFlow().execute(function (getLastEmail) {

            var deferred = protractor.promise.defer();
            console.log("Waiting for an email, please be patient...");

            mailListener.on("mail", function (mail) {
                deferred.fulfill(mail);
                var json = JSON.stringify(mail);
                var obj = json;

                var String = JSON.parse(json).html.replace(/\s/g, '');

                userId = String.substring(62, 71);
                console.log("====" + userId);

            });

            mailListener.on("error", function (err) {
                console.log(err);
            });

        })


    }

};


