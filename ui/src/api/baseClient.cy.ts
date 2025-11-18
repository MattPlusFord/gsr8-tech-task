import {BaseClient} from "./baseClient.ts";

describe('BaseClient', () => {
    describe('authenticatedRequest', () => {
        beforeEach(() => {
            cy.intercept('GET', `${import.meta.env.VITE_API_BASE_URL}/call/expected`, {
                statusCode: 500}).as('expectedCall');
            cy.intercept('GET', `${import.meta.env.VITE_API_BASE_URL}/call/not-expected`, {
                statusCode: 500}).as('notExpectedCall');
        });

        it('should set the x-user-id header with the fawdSession cookie value', async () => {
            const sessionValue = 'valid-session-token';
            cy.setCookie('fawdSession', sessionValue, {secure: true, httpOnly: false, sameSite: 'no_restriction'});
            BaseClient.authenticatedRequest('/call/expected', {method: 'GET'}).then(() => {
                return;
            });
            cy.wait('@expectedCall').then((interception) => {
                expect(interception.request.headers['x-user-id']).to.equal(sessionValue);
            });
        });

        it('should return null and not send the request when the fawdSession cookie value', async () => {
            await BaseClient.authenticatedRequest('/call/not-expected', {method: 'GET'});
            cy.get('@notExpectedCall').then((interception) => {
                expect(interception).to.be.null;
            });
        });
    });

    describe('unauthenticatedRequest', () => {
        beforeEach(() => {
            cy.intercept('GET', `${import.meta.env.VITE_API_BASE_URL}/call/expected`, {
                statusCode: 500}).as('expectedCall');
        });

        it('should make the request without setting the x-user-id header', async () => {
            await BaseClient.authenticatedRequest('/call/expected', {method: 'GET'});
            cy.wait('@expectedCall').then((interception) => {
                expect(interception.request.headers['x-user-id']).to.not.exist;
            });
        });
    });
});