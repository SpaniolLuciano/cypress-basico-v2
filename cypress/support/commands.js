Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").type("Luciano", { delay: 0 })
  cy.get("#lastName").type("Spaniol", { delay: 0 })
  cy.get("#email").type("luciano.spaniol@zero-defect.com.br", { delay: 0 })
  cy.get("#open-text-area").type("teste", { delay: 0 })
  cy.contains("button", "Enviar").click()
})
