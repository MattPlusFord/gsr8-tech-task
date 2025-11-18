import Header from "./Header.tsx";
import {MountLayer} from "../../../../cypress/support/component.tsx";
import {Route, Routes} from "react-router-dom";

const mountInRouter = () => {
    cy.mountWith(
        <Routes>
            <Route
                path="/"
                element={<Header />}
            />
        </Routes>,
        [MountLayer.Router, MountLayer.ErrorBoundary],
        {router: { initialEntries: ['/'] } }
    );
}

describe("Header", () => {
    describe('mounting', () => {
        it('within a router should be successful', () => {
            mountInRouter();
            cy.contains('Fawd Credit').should('exist');
        });

        it('outside of a router should be unsuccessful and throw an error', () => {
            cy.on('uncaught:exception', () => false)
            cy.stub(window.console, 'error').as('consoleError')
            cy.mountWith(<Header />, [MountLayer.ErrorBoundary]);
            cy.contains('Fawd Credit').should('not.exist');
            cy.get('@consoleError').should('be.calledWith', 'Header must be used within a Router context');
            cy.get('h1').should('exist').and('contain.text', 'Something Went Wrong');
        });

        it('should render the nav component', () => {
            mountInRouter();
            cy.get('nav.header').should('exist');
        });
    });

    describe("renders all nav options", () => {
        beforeEach(() => {
            mountInRouter();
        });

        describe("company logo", () => {
            it("should show", () => {
                cy.get('#company-logo.home-icon').contains("Fawd Credit").should("be.visible");
            });

            it('should have a link to the root url', () => {
                cy.get('#company-logo.home-icon').contains("Fawd Credit")
                    .invoke('attr', 'href').should('eq', '/');
            });
        });

        describe('end session', () => {
            it("should show", () => {
                cy.get('#end-session.nav-link').contains("End Session").should("be.visible");
            });

            it('should have a link to the customer select url', () => {
                cy.get('#end-session.nav-link').contains("End Session")
                    .invoke('attr', 'href').should('eq', '/customer-select');
            });
        });
    });
});
