/**
 * Created by Ferkat on 8/25/17.
 */
var reporter = require('cucumberjs-allure-reporter');
var fs = require('fs');
var reports=process.cwd() + '/reports';
var xmlReports = process.cwd() + '/reports/xml';

// var createReportsDir=function () {
    if(!fs.existsSync(reports)){
        fs.mkdir(reports);
    }
// }

var createXmlDir = function () {
    if (!fs.existsSync(xmlReports)) {
        fs.mkdir(xmlReports);
    }
} ();

reporter.config(
    {
        targetDir: xmlReports,
        labels : {
            feature: [/sprint-(\d*)/, /release-(\d)/, /area-(.*)/],
            issue: [/(bug-\d*)/],
            severity:[/criticall-\d*/]
        }
    }
);
module.exports = reporter;