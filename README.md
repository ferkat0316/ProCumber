# ProCumber
This is a full E2E testing framework build with Protractor, CucumberJS, PGJS, SuperAgent and Allure report to include DB, API and functional tests on Angular and Non Angular applications.


<h3>To Get Started</h3>

<h4>Pre-requisites</h4>
1.NodeJS installed globally in the system.
https://nodejs.org/en/download/

**Note** Min node version 6.9.x

2.Chrome or Firefox browsers installed.

3.Text Editor(Optional) installed-->Sublime/Webstorm.

</h4>Run Scripts</h4>
* Go inside the folder and run following command from terminal/command prompt

 >  npm install 

* All the dependencies from package.json would be installed in node_modules folder.

* This step will add needed browser driver for protractor(for Mac users)

>npm postinstall
 
* Run following command clear up reports folder before test execution 
  
>npm run clean
  
* Following command will launch the browser and run the functional test scripts
>   npm test
 
* Following command will run API tests
> npm run apiTest
 
 * Following command will generate Allure report
 >npm run report
 
 

  # Project tree
  * [config](./config)
    * [config.js](./config/config.js) Configuration file to run functional tests
    * [dbApiConf.js](./config/dbApiConf.js) Configuration file to run DB & API tests
    * [jenkins.config.js](./config/jenkins.conf.js) Configuration file to run functional tests from Jenkins
    * [saucelabs.config.js](./config/saucelabs.conf.js) Configuration file to run functional tests from Saucelabs
  * [reports](./reports) Holds Allure report
  * [support](./support) Stores all supporting files (eg: methodLib, hooks)
  * [test_suite](./test_suite) 
    * [features](./test_suite/features) This is the place you store all your feature files
    * [pages](./test_suite/pages) Page objects that store all elements on page and some data needed for API & DB testing
    * [stepDefinitions](./test_suite/stepDefinitions) stepDefinition files goes here
  * [.env](./.env) Some environment variables
  * [README.md](./README.md) What you're reading now is in here
  * [package.json](./package.json) All dependencies and scripts to run tests
  
  
  
