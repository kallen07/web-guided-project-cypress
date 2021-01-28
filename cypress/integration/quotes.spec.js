// write tests here
describe("Quotes app", () => {
  beforeEach(() => {
    // arbitrary code you want running before your tests start
    cy.visit("http://localhost:1234");
  });
  // here go our tests
  it("sanity test to make sure tests work", () => {
    // expect is an assertion
    // there can be many assertions per test
    // though inside the it statement (the test) usually
    // they are logically grouped together
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
  });

  it("playing around selecting elements from the DOM", () => {
    cy.get('input[name="text"]').should("exist");
  });
});
