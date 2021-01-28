// write tests here
describe("Quotes app", () => {
  beforeEach(() => {
    // arbitrary code you want running before your tests start
    cy.visit("http://localhost:1234");
  });

  const authorInput = () => cy.get('input[name="author"]');
  const textInput = () => cy.get('input[name="text"]');
  const submitBtn = () => cy.get("#submitBtn");
  const cancelBtn = () => cy.get('button[id="cancelBtn"]');

  // here go our tests
  it("sanity test to make sure tests work", () => {
    // expect is an assertion
    // there can be many assertions per test
    // though inside the it statement (the test) usually
    // they are logically grouped together
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
  });

  it("the proper elements are showing on the screen", () => {
    textInput().should("exist");
    cy.get('input[name="foobar"]').should("not.exist");
    authorInput().should("exist");
    submitBtn().should("exist");
    cancelBtn().should("exist");
    cy.contains("Submit Quote");
    cy.contains(/submit quote/i);
  });

  it("can type in the inputs", () => {
    // grab the inputs
    // assert they are empty
    // type in them
    // assert that the thing we typed is there
    textInput()
      .should("have.value", "")
      .type("have fun learning React")
      .should("have.value", "have fun learning React");

    authorInput()
      .should("have.value", "")
      .type("Rhiannon")
      .should("have.value", "Rhiannon");
  });

  it("submit button disabled until both inputs filled out", () => {
    // set up, sanity check / make sure initial state is legit
    // act (like typing or clicking)
    // assert that the action has the effect we expected

    submitButton().should("be.disabled");
    textInput().type("The network itself requires minimal structure.");
    textInput().clear();
    submitButton().should("be.disabled");
    authorInput().type("Satoshi Nakamoto");
    submitButton().should("be.disabled");
    textInput().type("The network itself requires minimal structure.");
    submitButton().should("not.be.disabled");

    //initial state: button disabled
    //type string in quote field
    //button still disabled
    //type string in author field
    //button should be enabled
    //check if button submits
    //removed text from quote field
    //check if button is disabled

    // button is disabled is true
    // type in text field
    // button is disabled is true
    // empty text field
    // type in author field
    // button disables is true
    // type in text field
    // button is disabled is false
  });
});
