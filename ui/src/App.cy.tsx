import App from "./App.tsx";

describe("App", () => {
    describe("when opened with no session", () => {
        beforeEach(() => {
            cy.mount(<App/>);
        });

        it("should go to the customer select screen when there is no session", () => {
            cy.get("a").contains("Fawd Credit");
            cy.get("p").contains("Fawd Credit Europe 2025");
            cy.url().should('include', '/customer-select');
        });
    });

    describe("when opened with a session", () => {
        beforeEach(() => {
            cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
            cy.mount(<App/>);
        });

        it.only("should go to the home screen when there is a session", () => {
            cy.get("a").contains("Fawd Credit");
            cy.get("p").contains("Fawd Credit Europe 2025");
            cy.url().should('not.contain', '/customer-select');
        });
    });
});
