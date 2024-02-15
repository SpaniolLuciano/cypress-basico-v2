/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  const THREE_SECONDS_IN_MS = 3000
  beforeEach(() => {
    cy.visit("./src/index.html")
  })

  it("verifica o título da aplicação", function () {
    cy.title().should("be.eq", "Central de Atendimento ao Cliente TAT")
  })
  it("preenche os campos obrigatórios e envia o formulário", function () {
    const longTest =
      "Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee,Testee"
    cy.clock()
    cy.get("#firstName").type("Luciano", { delay: 0 })
    cy.get("#lastName").type("Spaniol", { delay: 0 })
    cy.get("#email").type("luciano.spaniol@zero-defect.com.br", {
      delay: 0,
    })
    cy.get("#open-text-area").type(longTest, { delay: 0 })
    cy.contains("button", "Enviar").click()
    cy.get(".success").should("be.visible")
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get(".success").should("not.be.visible")
  })
  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", function () {
    cy.clock()
    cy.get("#firstName").type("Luciano", { delay: 0 })
    cy.get("#lastName").type("Spaniol", { delay: 0 })
    cy.get("#email").type("luciano.spaniol@zero", { delay: 0 })
    cy.get("#open-text-area").type("teste")
    cy.contains("button", "Enviar").click()
    cy.get(".error").should("be.visible")
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get(".error").should("not.be.visible")
  })
  it("campo telefone continua vazio ao preenche-lo com valor não-numérico", function () {
    cy.get("#phone").type("Spaniol", { delay: 0 }).should("have.value", "")
  })
  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", function () {
    cy.clock()
    cy.get("#firstName").type("Luciano", { delay: 0 })
    cy.get("#lastName").type("Spaniol", { delay: 0 })
    cy.get("#email").type("luciano.spaniol@zero-defect.com.br", {
      delay: 0,
    })
    cy.get("#phone-checkbox").check()
    cy.get("#open-text-area").type("testes", { delay: 0 })
    cy.contains("button", "Enviar").click()
    cy.get(".error").should("be.visible")
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get(".error").should("not.be.visible")
  })
  it("preenche e limpa os campos nome, sobrenome, email e telefone", function () {
    cy.get("#firstName")
      .type("Luciano", { delay: 0 })
      .should("have.value", "Luciano")
      .clear()
      .should("have.value", "")
    cy.get("#lastName")
      .type("Spaniol", { delay: 0 })
      .should("have.value", "Spaniol")
      .clear()
      .should("have.value", "")
    cy.get("#email")
      .type("luciano.spaniol@zero-defect.com.br", { delay: 0 })
      .should("have.value", "luciano.spaniol@zero-defect.com.br")
      .clear()
      .should("have.value", "")
    cy.get("#phone")
      .type("51999999999", { delay: 0 })
      .should("have.value", "51999999999")
      .clear()
      .should("have.value", "")
  })
  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", function () {
    cy.clock()
    cy.contains("button", "Enviar").click()
    cy.get(".error").should("be.visible")
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get(".error").should("not.be.visible")
  })
  Cypress._.times(3, function () {
    it("envia o formuário com sucesso usando um comando customizado", function () {
      cy.clock()
      cy.fillMandatoryFieldsAndSubmit()
      cy.get(".success").should("be.visible")
      cy.tick(THREE_SECONDS_IN_MS)
      cy.get(".success").should("not.be.visible")
    })
  })
  it("seleciona um produto (YouTube) por seu texto", function () {
    cy.get("#product").select("YouTube").should("have.value", "youtube")
  })
  it("seleciona um produto (Mentoria) por seu valor (value)", function () {
    cy.get("#product").select("mentoria").should("have.value", "mentoria")
  })
  it("seleciona um produto (Blog) por seu índice", function () {
    cy.get("#product").select(1).should("have.value", "blog")
  })
  it("marca o tipo de atendimento 'Feedback'", function () {
    cy.get("input[type='radio'][value='feedback']").check().should("be.checked")
  })
  it("marca cada tipo de atendimento", function () {
    cy.get("input[type='radio']")
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should("be.checked")
      })
  })
  it("marca ambos checkboxes, depois desmarca o último", function () {
    cy.get("input[type='checkbox']")
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked")
  })
  it("seleciona um arquivo da pasta fixtures", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json")
      })
  })
  it("seleciona um arquivo simulando um drag-and-drop", function () {
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json")
      })
  })
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", function () {
    cy.fixture("example.json").as("sampleFile")
    cy.get("#file-upload")
      .should("not.have.value")
      .selectFile("@sampleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json")
      })
  })
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", function () {
    cy.get("#privacy a").should("have.attr", "target", "_blank")
  })
  it("acessa a página da política de privacidade removendo o target e então clicando no link", function () {
    cy.get("#privacy a").invoke("removeAttr", "target").click()
    cy.contains("Talking About Testing").should("be.visible")
  })

  it("exibe e esconde as mensagens de sucesso e erro usando o .invoke", function () {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible")
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible")
  })
  it("preenche a area de texto usando o comando invoke", function () {
    const longTest = Cypress._.repeat("daujsdnhaoisjda", 56)
    cy.get("#open-text-area")
      .invoke("val", longTest)
      .should("have.value", longTest)
  })
  it("faz uma requisição HTTP", function () {
    cy.request(
      "https://cac-tat.s3.eu-central-1.amazonaws.com/index.html"
    ).should(function (response) {
      const { status, statusText, body } = response
      expect(status).to.equal(200)
      expect(statusText).to.equal("OK")
      expect(body).contains("CAC TAT")
    })
  })
  it("exibe o gato oculto na aplicação", function () {
    cy.get("#cat")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .invoke("hide")
      .should("not.be.visible")
  })
})
