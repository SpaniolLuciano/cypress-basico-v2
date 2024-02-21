import { Given, When, Then } from "cypress-cucumber-preprocessor/steps"

Given("I access the jsonplaceholder page", () => {
  cy.visit("https://jsonplaceholder.typicode.com/")
  cy.contains("Try it").should("be.visible")
})

When("I click on {string} button", (buttonText) => {
  cy.intercept("GET", "https://jsonplaceholder.typicode.com/todos/1").as(
    "getReq"
  )
  cy.contains(buttonText).click()
})

When("A GET request return all users", () => {
  cy.wait("@getReq")
    .its("response.body.title")
    .should("be.equal", "delectus aut autem")
})
