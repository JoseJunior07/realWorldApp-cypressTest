describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Transferir valor para um contato com saldo suficiente", () => {
    cy.readFile("data/datauser.json").then((data) => {
      const user = data.users[0];
      const secretPassword = data.userPassword[0].secretPassword;
      cy.get('[data-test="signin-username"]').type(user.username);
      cy.get('[data-test="signin-password"]').type(secretPassword);
      cy.get('[data-test="signin-submit"]').click();

      cy.get(".MuiToolbar-root").then(($body) => {
        if ($body.find('[data-test="nav-top-new-transaction"]').length > 0) {
          cy.get('[data-test="nav-top-new-transaction"]').click();
        }
        cy.get('[data-test="user-list-item-GjWovtg2hr"]').click();
        cy.get('[data-test="transaction-create-amount-input"]').should("be.visible");
        cy.get('[data-test="transaction-create-amount-input"]').click();
        cy.get('[data-test="transaction-create-amount-input"]').type("100");

        cy.get('[data-test="transaction-create-description-input"]').should("be.visible");
        cy.get('[data-test="transaction-create-description-input"]').click();
        cy.get('[data-test="transaction-create-description-input"]').type("teste_saldoSuficient");

        cy.get('[data-test="transaction-create-submit-payment"]').click();
        cy.get(".MuiAlert-message").contains("Transaction Submitted").should("exist");
      });
    });
  });
  it("Transferir valor com saldo insuficiente", () => {
    cy.readFile("data/datauser.json").then((data) => {
      const user = data.users[0];
      const secretPassword = data.userPassword[0].secretPassword;
      cy.get('[data-test="signin-username"]').type(user.username);
      cy.get('[data-test="signin-password"]').type(secretPassword);
      cy.get('[data-test="signin-submit"]').click();

      cy.get(".MuiToolbar-root").then(($body) => {
        if ($body.find('[data-test="nav-top-new-transaction"]').length > 0) {
          cy.get('[data-test="nav-top-new-transaction"]').click();
        }
        cy.get('[data-test="user-list-item-GjWovtg2hr"]').click();
        cy.get('[data-test="transaction-create-amount-input"]').should("be.visible");
        cy.get('[data-test="transaction-create-amount-input"]').click();
        cy.get('[data-test="transaction-create-amount-input"]').type("100000");

        cy.get('[data-test="transaction-create-description-input"]').should("be.visible");
        cy.get('[data-test="transaction-create-description-input"]').click();
        cy.get('[data-test="transaction-create-description-input"]').type("teste_saldoInsuficient");

        cy.get('[data-test="transaction-create-submit-payment"]').click();
        cy.get(".MuiAlert-message").contains("Insufficient funds").should("exist");
      });
    });
  });
  it("Exibir mensagem de erro para campo Amount vazio", () => {
    cy.readFile("data/datauser.json").then((data) => {
      const user = data.users[0];
      const secretPassword = data.userPassword[0].secretPassword;
      cy.get('[data-test="signin-username"]').type(user.username);
      cy.get('[data-test="signin-password"]').type(secretPassword);
      cy.get('[data-test="signin-submit"]').click();

      cy.get(".MuiToolbar-root").then(($body) => {
        if ($body.find('[data-test="nav-top-new-transaction"]').length > 0) {
          cy.get('[data-test="nav-top-new-transaction"]').click();
        }
        cy.get('[data-test="user-list-item-GjWovtg2hr"]').click();
        cy.get('[data-test="transaction-create-amount-input"]').should("be.visible");

        cy.get('[data-test="transaction-create-description-input"]').should("be.visible");
        cy.get('[data-test="transaction-create-description-input"]').click();
        cy.get('[data-test="transaction-create-description-input"]').type("teste_campoVazio");
        cy.get("#transaction-create-amount-input-helper-text")
          .contains("Please enter a valid amount")
          .should("exist");
      });
    });
  });
});
