const { should } = require("chai");

describe("Login e visualização do histórico de transações", () => {
  beforeEach(() => {
    cy.visit("/localhost/3000");
  });

  it("Visualizar histórico de transações com sucesso", () => {
    cy.readFile("data/datauser.json").then((data) => {
      const user = data.users[0];
      const secretPassword = data.userPassword[0].secretPassword;

      // Realiza o login
      cy.get('[data-test="signin-username"]').type(user.username);
      cy.get('[data-test="signin-password"]').type(secretPassword);
      cy.get('[data-test="signin-submit"]').click();

      // Verifica se estamos na página inicial
      cy.get("body").then(($body) => {
        if ($body.find('[data-test="sidenav-home"]').length > 0) {
          // Estamos na página inicial, continue com a verificação da lista de transações
          cy.get('[data-test="transaction-list"]').should("be.visible");
        }
      });
    });
  });
  it.only("Tentar visualizar o histórico de transações de um usuário sem transações anteriores", () => {
    cy.get("[data-test='signup']").click();
    cy.get("[data-test='signup-first-name']").type("test_First_Name");
    cy.get("[data-test='signup-last-name']").type("test_Last_Name");
    cy.get("[data-test='signup-username']").type("test_Username");
    cy.get("[data-test='signup-password']").type("test_Password");
    cy.get("[data-test='signup-confirmPassword']").type("test_Password");
    cy.get("[data-test='signup-submit']").click();
    cy.location("pathname").should("eq", "/signup");

    // Realiza o login
    cy.get('[data-test="signin-username"]').type("test_Username");
    cy.get('[data-test="signin-password"]').type("test_Password");
    cy.get('[data-test="signin-submit"]').click();

    //CASO SEJA O PRIMEIRO TESTE, ESSE SERÁ O TESTE DE CRIAÇÃO DA CONTA
    cy.get('[data-test="user-onboarding-next"] > .MuiButton-label').click();
    cy.get('#bankaccount-bankName-input').click().type("12345");
    cy.get('#bankaccount-routingNumber-input').click().type("123456789");
    cy.get('#bankaccount-accountNumber-input').click().type("123456789");
    cy.get('[data-test="bankaccount-submit"]').click();
    cy.get('[data-test="user-onboarding-next"] > .MuiButton-label').click();

    cy.get('[data-test="nav-personal-tab"]').click();
    cy.get('[data-test="main"]').should("contain.text", "No Transactions");
    cy.get('[data-test="transaction-list-empty-create-transaction-button"]').should("be.visible");
  });
});
