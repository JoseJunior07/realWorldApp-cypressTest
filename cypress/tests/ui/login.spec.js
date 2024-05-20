describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Login com credenciais válidas", () => {
    cy.readFile("data/datauser.json").then((data) => {
      const user = data.users[0];
      const secretPassword = data.userPassword[0].secretPassword;

      cy.get('[data-test="signin-username"]').type(user.username);
      cy.get('[data-test="signin-password"]').type(secretPassword);
      cy.get('[data-test="signin-submit"]').click();
    });
  });
  it("Login com usuário e senha inválidos", () => {
    cy.readFile("data/datauser.json").then((data) => {
      const invalidUser = { username: "usuario_invalido", password: "senha_invalida" };

      cy.get('[data-test="signin-username"]').type(invalidUser.username);
      cy.get('[data-test="signin-password"]').type(invalidUser.password);
      cy.get('[data-test="signin-submit"]').click();
      cy.get('[data-test="signin-error"]').contains("Username or password is invalid");
    });
  });
  it("Login com usuário válido e senha inválida", () => {
    cy.readFile("data/datauser.json").then((data) => {
      const user = data.users[1];
      const invalidUser = { password: "senha_invalida" };

      cy.get('[data-test="signin-username"]').type(user.username);
      cy.get('[data-test="signin-password"]').type(invalidUser.password);
      cy.get('[data-test="signin-submit"]').click();
      cy.get('[data-test="signin-error"]').contains("Username or password is invalid");
    });
  });
  it("Login com usuário inválido e senha válida", () => {
    cy.readFile("data/datauser.json").then((data) => {
      const invalidUser = { username: "usuario_invalido" };
      const secretPassword = data.userPassword[0].secretPassword;

      cy.get('[data-test="signin-username"]').type(invalidUser.username);
      cy.get('[data-test="signin-password"]').type(secretPassword);
      cy.get('[data-test="signin-submit"]').click();
      cy.get('[data-test="signin-error"]').contains("Username or password is invalid");
    });
  });
});
