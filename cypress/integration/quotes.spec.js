// write tests here
describe("Quotes Application", () => {

  beforeEach(() => {
    cy.visit('http://localhost:1234')
  });

  const textInput = () => cy.get('input[name=text]');
  const authorInput = () => cy.get('input[name=author]');
  const dogInput = () => cy.get('input[name=dog]');
  const submitBtn = () => cy.get('button[id=submitBtn]');
  const cancelBtn = () => cy.get('button[id=cancelBtn]');

  it("Basic test", () => {
    expect(true).to.equal(true)
    expect(1 + 1).to.equal(2)
    expect({}).to.eql({})
  });

  it("Check proper elements are visible on the page", () => {
    textInput().should('exist');
    authorInput().should('exist')
    dogInput().should('not.exist')
    submitBtn().should('exist')
    cancelBtn().should('exist')

    cy.contains("Submit Quote").should('exist');
    cy.get('[data-cy=quoteInput]').should('exist')  // best way to select elements
  });

  describe("Can fill out inputs and cancel", () => {
    it("Submit button is disabled on page load", () => {
      submitBtn().should("be.disabled")
    });

    it("Can type into text input", () => {
      textInput()
        .should('have.value', '')
        .type('I love cheese')
        .should('have.value', "I love cheese")
    });

    it('Can type in author input', () => {
      authorInput()
        .should('have.value', '')
        .type('that one guy')
        .should('have.value','that one guy')
    });

    it('Submit button becomes enabled if we type into both inputs', () => {
      // be.enabled
      textInput().type("I love cheese")
      authorInput().type('Shakespeare')
      submitBtn().should('be.enabled')
    });

    it("Cancel button resets inputs and disabled submit", () => {
      textInput().type("hello")
      authorInput().type("everyone")
      cancelBtn().click()
      textInput().should("have.value", '')
      authorInput().should('have.value', '')
      submitBtn().should("be.disabled")
    });

    describe("Can add new quote and delete it", () => {
      it("Submit and delete", () => {
        cy.contains(/get some sleep/i).should('not.exist')
        textInput().type('Get some sleep')
        authorInput().type('Your Doctor')
        submitBtn().click()
        cy.contains(/get some sleep/i).should('exist')
        cy.contains(/get some sleep/i).next().next().click()
        cy.contains(/get some sleep/i).should('not.exist')
      });
    });

    it('Can edit a quote', () => {
      // create new quote and submit it
      textInput().type("We love NPM")
      authorInput().type('webpt25')
      submitBtn().click()
      // click edit button and check inputs are filled with what we submitted
      cy.contains('We love NPM').siblings('button:nth-of-type(1)').click()
      textInput().should('have.value', 'We love NPM')
      authorInput().should('have.value', 'webpt25')
      // edit the quote and submit changese

      textInput().type(' so much')
      submitBtn().click()
      // check that are our changes worked
      cy.contains('We love NPM so much')

      // delete the quote we just added
      cy.contains('We love NPM so much').next().next().click()
      cy.contains('We love NPM so much').should('not.exist')
    });

  })
});
