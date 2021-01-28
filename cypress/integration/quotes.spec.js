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

    //initial state: button disabled
    submitBtn().should("be.disabled");
    //type string in quote field
    textInput().type("The network itself requires minimal structure.");
    //button still disabled
    submitBtn().should("be.disabled");
    textInput().clear();
    //type string in author field
    authorInput().type("Satoshi Nakamoto");
    //button should be disabled
    submitBtn().should("be.disabled");
    textInput().type("The network itself requires minimal structure.");
    submitBtn().should("not.be.disabled");
  });

  it("can cancel a new quote", () => {
    // should('have.value', '') -- empty input
    textInput().type("Some quote");
    authorInput().type("Stephen King");
    cancelBtn().click();
    textInput().should("have.value", "");
    authorInput().should("have.value", "");
  });

  it("can submit a new quote", () => {
    // setup: that the quote ("have fun (Rhiannon)") is not in the DOM
    // act: create quote: "have fun (Rhiannon)"
    // assert: that the have fun text is now in the DOM
  });
});
