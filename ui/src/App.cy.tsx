import App from "./App.tsx";
import {CookieUtils} from "./utils/cookies.ts";

describe("App", () => {
    describe("when opened with a session", () => {
        const userId = 2;
        const userName = 'Test user';

        beforeEach(() => {
            cy.intercept(`http://localhost:8080/users/details`, {body: {id: userId, name: userName, email: 'test@ford.com'}});
            cy.stub(CookieUtils, 'getCookieValue').callsFake(() => {return 'test-cookie'});
            cy.mount(<App/>);
        });

        it("should go to the home screen when there is a session", () => {
            cy.get("a").contains("Fawd Credit");
            cy.get("p").contains("Fawd Credit Europe 2025");
            cy.contains(userName).should('be.visible');
        });
    });

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
});
