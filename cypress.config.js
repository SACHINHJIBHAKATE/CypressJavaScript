const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '6zr1n5',

  // For default configurations, under the Test Runner, navigate to 'Settings' -> 'Project Settings'
  // defaultCommandTimeout: 4000 (This is the default timeout duration)
  // The default global configurations can be overriden in 'cypress.config.js' file e.g. value for 'defaultCommandTimeout' is overriden to 10000 ms (10 seconds)
  // After we update this and relaunch the Test Runner, 'defaultCommandTimeout' under 'Project Settings' reflects the new command timeout duration i.e., 10000 ms (10 seconds)
  defaultCommandTimeout: 10000,

  // Under the Test Runner, navigate to 'Settings' -> 'Project Settings', following structure is defined under 'cypress.config.js'
  // env: {
  //  }  
  env:
  {
    url1:'https://rahulshettyacademy.com/seleniumPractise/#/',
    url2:'https://rahulshettyacademy.com/AutomationPractice/',
    url3:'https://rahulshettyacademy.com/angularpractice/',
  },

  "retries": {
    // Configure retry attempts for `cypress run`
    // Default is 0
    "runMode": 1
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/*.js'
  },
});
