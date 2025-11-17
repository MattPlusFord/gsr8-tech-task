import AuthGuard from "./AuthGuard.tsx";
import {MountLayer} from "../../../cypress/support/component.tsx";
import {Route, Routes} from "react-router-dom";

const customerSelectPath = `/customer-select`;

const mountInRouter = ({routerInitialEntries}: { routerInitialEntries?: string[]}) => {
    const unauthedRoutes = [customerSelectPath, '/noauth'];
    cy.mountWith(
        <AuthGuard redirectPath={customerSelectPath} unauthedRoutes={unauthedRoutes}>
            <Routes>
                <Route
                    path="/"
                    element={
                            <div data-testid="protected-content">Protected Content</div>
                    }
                />
                <Route
                    path="/noauth"
                    element={
                        <div data-testid="unprotected-content">Unprotected Content</div>
                    }
                />
                <Route
                    path={customerSelectPath}
                    element={
                        <p>Chose a customer</p>
                    }
                />
            </Routes>
        </AuthGuard>,
        [MountLayer.Router, MountLayer.ErrorBoundary],
        {router: { initialEntries: routerInitialEntries ? routerInitialEntries : ['/'] } }
    );
}

describe('AuthGuard', () => {
    describe('mounting', () => {
        it('within a router should be successful', () => {
            cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
            cy.stub(window.console, 'error').as('consoleError')
            mountInRouter({});
            cy.get('[data-testid="protected-content"]').should('exist').and('contain.text', 'Protected Content');
            cy.get('@consoleError').should('not.be.called');
        });

        it('outside of a router should be unsuccessful and throw an error', () => {
            cy.on('uncaught:exception', () => false)
            cy.stub(window.console, 'error').as('consoleError')
            cy.mountWith(<AuthGuard redirectPath={customerSelectPath}><div data-testid="protected-content">Protected Content</div></AuthGuard>,
                [MountLayer.ErrorBoundary]);
            cy.get('[data-testid="protected-content"]').should('not.exist');
            cy.get('@consoleError').should('be.calledWith', 'AuthGuard must be used within a Router context');
            cy.get('h1').should('exist').and('contain.text', 'Something Went Wrong');
        });
    });

    it('should render its children correctly when it has a session set', () => {
        cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
        mountInRouter({});
        cy.get('[data-testid="protected-content"]').should('exist').and('contain.text', 'Protected Content');
    });

    it('should render its children when no session set but the path is not protected', () => {
        mountInRouter({routerInitialEntries: ['/noauth']});
        cy.get('[data-testid="unprotected-content"]').should('exist').and('contain.text', 'Unprotected Content');
    });

    it('should redirect to the defined non authed path no session set and the path is protected', () => {
        mountInRouter({});
        cy.get('p').contains('Chose a customer');
    });
});