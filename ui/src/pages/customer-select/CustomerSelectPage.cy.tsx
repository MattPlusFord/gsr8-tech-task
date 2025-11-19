import {getCookieValue} from "../../utils/cookies.ts";
import CustomerSelectPage from "./CustomerSelectPage.tsx";
import {MountLayer} from "../../../cypress/support/component.tsx";
import {Route, Routes} from "react-router-dom";

const TestComponent = () => {
    return (
        <Routes>
            <Route path="/customer-select" element={<CustomerSelectPage />} />
            <Route path="" element={<>Home</>} />
        </Routes>
    );
}

describe("CustomerSelectPage", () => {
    const fawdSession = `fawdSession`;
    beforeEach(() => {
        cy.mountWith(<TestComponent />, [MountLayer.Router], { router: { initialEntries: ['/customer-select'] } });
    });

    it('should render correctly', () => {
        cy.contains('Enter customer email address').should('exist');
        cy.get('input[type="email"]').should('exist');
        cy.contains('Continue').should('exist');
    });

    describe('submit valid customer email', () => {
        const sessionValue = 'valid-session-token';
        beforeEach(() => {
            cy.intercept('POST', `**/session`, {
                statusCode: 200,
                headers: {'set-cookie': `${fawdSession}=${sessionValue}; Path=/; Secure; SameSite=None`},
            });
        });

        it('should set the session cookie and redirect to the home page', () => {
            cy.get('input[type="email"]').should('exist').type('jdoe@ford.com');
            cy.contains('Continue').click();
            cy.contains('Home').should('exist');
        });
    });

    describe('submit invalid customer email', () => {
        const errorBody = {error: 'Invalid email address'};
        beforeEach(() => {
            cy.intercept('POST', `${import.meta.env.VITE_API_BASE_URL}/session`, {
                statusCode: 401,
                body: errorBody,
            });
        });

        it('should set display the error', () => {
            cy.get('input[type="email"]').should('exist').type('jdoe@ford.com');
            cy.contains('Continue').click();
            expect(getCookieValue(fawdSession)).to.be.undefined;
            cy.url().should('include', '/customer-select');
            cy.contains('Invalid email address').should('exist');
        });
    });
});