import SessionClient from "./authClient.ts";
import {BaseClient} from "../baseClient.ts";

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

            it('should return true', async () => {
                expect(await SessionClient.startSession("test@ford.com")).to.be.true;
            });
        });

        describe('unsuccessful response', () => {
            const errorBody = {error: 'Something went wrong'};

            beforeEach(() => {
                cy.intercept('POST', `${import.meta.env.VITE_API_BASE_URL}/session`, {
                    statusCode: 500,
                    body: errorBody,
                });
            });

            it('should return null', async () => {
                expect(await SessionClient.startSession("test@ford.com")).to.be.null;
            });
        });

        describe('error from baseClient', () => {
            it('should return null', async () => {
                cy.stub(BaseClient, "authenticatedRequest").callsFake(() => {
                    return Promise.reject(new Error("Network error"));
                });
                expect(await SessionClient.startSession("test@ford.com")).to.be.null;
            });
        });
    });
});