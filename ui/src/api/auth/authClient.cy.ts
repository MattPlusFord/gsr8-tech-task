import {getCookieValue} from "../../utils/cookies.ts";
import SessionClient from "./authClient.ts";

describe('authClient', () => {
    const fawdSession = `fawdSession`;
    describe('startSession', () => {
        describe('successful response', () => {
            const sessionValue = 'valid-session-token';
            beforeEach(() => {
                cy.intercept('POST', `${import.meta.env.VITE_API_BASE_URL}/session`, {
                    statusCode: 200,
                    headers: {'set-cookie': `${fawdSession}=${sessionValue}; Path=/; Secure; SameSite=None`},
                });
            });

            it('should set a session cookie', async () => {
                expect(await SessionClient.startSession()).to.be.true;
                expect(getCookieValue(fawdSession)).to.equal(sessionValue);
            });
        });

        describe('unsuccessful response', () => {
            const errorBody = {error: 'Something went wrong'};

            beforeEach(() => {
                cy.intercept('POST', `${import.meta.env.VITE_API_BASE_URL}/session`, {
                    statusCode: 500,
                    body: errorBody,
                });
                cy.stub(window.console, 'error').as('consoleError')
            });

            it('should return null and set no cookie', async () => {
                await SessionClient.startSession();
                expect(getCookieValue(fawdSession)).to.be.undefined;
                cy.get('@consoleError').should('be.calledWith', errorBody);
            });
        });
    });
});