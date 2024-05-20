describe("Register User", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Registro de novo usuário com informações válidas", () => {
    cy.get("[data-test='signup']").click();
    cy.get("[data-test='signup-first-name']").type("test_First_Name");
    cy.get("[data-test='signup-last-name']").type("test_Last_Name");
    cy.get("[data-test='signup-username']").type("test_Username");
    cy.get("[data-test='signup-password']").type("test_Password");
    cy.get("[data-test='signup-confirmPassword']").type("test_Password");
    cy.get("[data-test='signup-submit']").click();
    cy.location("pathname").should("eq", "/signup");
  });

  it("Registro de novo usuário com informações incompletas", () => {
    cy.get("[data-test='signup']").click();

    const fields = [
      {
        selector: "[data-test='signup-first-name'] input",
        helper: "#firstName-helper-text",
        message: "First Name is required",
      },

      {
        selector: "[data-test='signup-last-name'] input",
        helper: "#lastName-helper-text",
        message: "Last Name is required",
      },

      {
        selector: "[data-test='signup-username'] input",
        helper: "#username-helper-text",
        message: "Username is required",
      },

      {
        selector: "[data-test='signup-password'] input",
        helper: "#password-helper-text",
        message: "Enter your password",
      },

      {
        selector: "[data-test='signup-confirmPassword'] input",
        helper: "#confirmPassword-helper-text",
        message: "Confirm your password",
      },
    ];

    fields.forEach((field) => {
      cy.get(field.selector).focus();
      cy.get(field.selector).blur();
      cy.get(field.helper).should("have.text", field.message);
    });
  });
});
