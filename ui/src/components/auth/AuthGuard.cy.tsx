import AuthGuard from "./AuthGuard.tsx";
import {MockRoute, MountLayer} from "../../../cypress/support/component.tsx";
import {Route, Routes} from "react-router-dom";

const unAuthedPath = `/customer-select`;
const customerSelectRoute: MockRoute = {
    path: unAuthedPath,
    component: <p>Chose a customer</p>,
};

const mountInRouter = ({routes}: { routes: MockRoute[] }) => {
    cy.mountWith(
        <Routes>
            <Route
                path="/"
                element={<AuthGuard redirectPath={unAuthedPath}><div data-testid="protected-content">Protected Content</div></AuthGuard>}
            />
            {routes?.map((route) => (
                <Route path={route.path} element={route.component} />
            ))}
        </Routes>,
        [MountLayer.Router, MountLayer.ErrorBoundary],
        {router: { initialEntries: ['/'] } }
    );
}

describe('AuthGuard', () => {
    describe('mounting', () => {
        it('within a router should be successful', () => {
            cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
            cy.stub(window.console, 'error').as('consoleError')
            mountInRouter({routes: [customerSelectRoute]});
            cy.get('[data-testid="protected-content"]').should('exist').and('contain.text', 'Protected Content');
            cy.get('@consoleError').should('not.be.called');
        });

        it('outside of a router should be unsuccessful and throw an error', () => {
            cy.on('uncaught:exception', () => false)
            cy.stub(window.console, 'error').as('consoleError')
            cy.mountWith(<AuthGuard redirectPath={unAuthedPath}><div data-testid="protected-content">Protected Content</div></AuthGuard>,
                [MountLayer.ErrorBoundary]);
            cy.get('[data-testid="protected-content"]').should('not.exist');
            cy.get('@consoleError').should('be.calledWith', 'AuthGuard must be used within a Router context');
            cy.get('h1').should('exist').and('contain.text', 'Something went wrong');
        });
    });

    it('should render its children correctly when it has a session set', () => {
        cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
        mountInRouter({routes: [customerSelectRoute]});
        cy.get('[data-testid="protected-content"]').should('exist').and('contain.text', 'Protected Content');
    });

    it('should redirect to the defined non authed path no session set', () => {
        mountInRouter({routes: [customerSelectRoute]});
        cy.get('p').contains('Chose a customer');
    });
});