describe("Central de Atendimento ao Cliente TAT", function () {
  it("verifica o título da aplicação", function () {
    cy.visit("./src/privacy.html")
    cy.contains("Talking About Testing").should("be.visible")
  })
})
