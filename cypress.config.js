const cucumber = require("cypress-cucumber-preprocessor").default
const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber())
    },

    env: {
      snapshotOnly: true,
    },
    specPattern: "**/*.feature",
    testIsolation: false,
  },
})
