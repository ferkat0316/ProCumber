/**
 * Created by Ferkat on 8/25/17.
 */
'use strict';

module.exports= {
    /**
     * Description
     * @method highlightElement
     * @param {} elm
     * @return CallExpression
     */
    highlightElement: function (elm) {
        // console.log("highlight--");
        // console.log("locator---:" + elm.locator());

        return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);",
            elm.getWebElement(), "color: Red; border: 2px solid red;").then(function (resp) {
            browser.sleep(2000);
            return elm;
        }, function (err) {
            console.log("error is :" + err);
        });
    },

    /**
     * Description
     * @method highlightElements
     * @param {} elms
     * @param {} num
     * @return CallExpression
     */
    highlightElements: function (elms, num) {

        return browser.driver.executeScript("arguments[0].setAttribute('style', arguments[1]);",
            elms.get(num).getWebElement(), "color: Red; border: 2px solid red;").then(function (resp) {
            browser.sleep(200);
            return elms;
        }, function (err) {
            console.log("error is :" + err);
        });
    }
};