import {MountLayer} from "../../../../cypress/support/component.tsx";
import {Route, Routes} from "react-router-dom";
import BasePage from "./BasePage.tsx";

const mountInRouter = () => {
    cy.mountWith(
        <Routes>
            <Route
                path="/"
                element={<BasePage><div data-testid="main-content">Main Content</div></BasePage>}
            />
        </Routes>,
        [MountLayer.Router, MountLayer.ErrorBoundary],
        {router: { initialEntries: ['/'] } }
    );
}

describe('AuthGuard', () => {
    describe('mounting', () => {
        it('within a router should be successful', () => {
            cy.stub(window.console, 'error').as('consoleError')
            mountInRouter();
            cy.get('[data-testid="main-content"]').should('exist').and('contain.text', 'Main Content');
            cy.get('@consoleError').should('not.be.called');
        });

        it('outside of a router should be unsuccessful and throw an error', () => {
            cy.on('uncaught:exception', () => false)
            cy.stub(window.console, 'error').as('consoleError')
            cy.mountWith(<BasePage><div data-testid="main-content">Main Content</div></BasePage>,
                [MountLayer.ErrorBoundary]);
            cy.get('[data-testid="main-content"]').should('not.exist');
            cy.get('@consoleError').should('be.calledWith', 'Base page must be used within a Router context');
            cy.get('h1').should('exist').and('contain.text', 'Something Went Wrong');
        });

        it('should render the header', () => {
            cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
            mountInRouter();
            cy.get('nav.header').should('exist');
        });

        it('should render the footer', () => {
            mountInRouter();
            cy.get('div.footer').should('exist');
        });
    });
});