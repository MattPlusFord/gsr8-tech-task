import {AccountClient} from "./accountClient.ts";

describe('AccountClient', () => {
    describe('loadAccountsForUser', () => {
        const accountListUrl = `${import.meta.env.VITE_API_BASE_URL}/agreements`;
        describe('successful response', () => {
            describe('with valid data', () => {
                const validAccountData = [
                    {
                        'id': "1",
                        'user': {id: "1", email: "john.doe@ford.com", name: "John Doe"},
                        'balance': 1234.56,
                        'interestRate': 5.3
                    }, {
                        'id': "2",
                        'user': {id: "1", email: "john.doe@ford.com", name: "John Doe"},
                        'balance': 2345.67,
                        'interestRate': 4.8
                    }
                ];

                beforeEach(() => {
                    cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                    cy.intercept('GET', accountListUrl, {
                        statusCode: 200,
                        body: validAccountData,});
                });

                it('should return user data', async () => {
                    expect(await AccountClient.loadAccountListForUser()).to.deep.equal(validAccountData);
                });
            });
        });

        describe('unsuccessful response', () => {
            const errorBody = {error: 'Something went wrong'};

            beforeEach(() => {
                cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                cy.intercept('GET', accountListUrl, {
                    statusCode: 500,
                    body: errorBody,});
                cy.stub(window.console, 'error').as('consoleError')
            });

            it('should return null', async () => {
                expect(await AccountClient.loadAccountListForUser()).to.be.null;
                cy.get('@consoleError').should('be.calledWith', errorBody);
            });
        });

        describe('with no session cookie', () => {
            beforeEach(() => {
                cy.stub(window.console, 'error').as('consoleError')
            });

            it('should return null', async () => {
                expect(await AccountClient.loadAccountListForUser()).to.be.null;
                cy.get('@consoleError').should('be.calledWith', "No session cookie found");
            });
        });
    });

    describe('accountDetails', () => {
        const agreementId = '1';
        const accountDetailsUrl = `**/agreements/${agreementId}`;

        describe('successful response', () => {
            describe('with valid data', () => {
                const validAccountDetails = {
                    'id': "1",
                    'user': {id: "1", email: "john.doe@ford.com", name: "John Doe"},
                    'balance': 1234.56,
                    'interestRate': 5.3
                };

                beforeEach(() => {
                    cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                    cy.intercept('GET', accountDetailsUrl, {
                        statusCode: 200,
                        body: validAccountDetails,});
                });

                it('should return user data', async () => {
                    expect(await AccountClient.loadAccountDetails(agreementId)).to.deep.equal(validAccountDetails);
                });
            });
        });

        describe('unsuccessful response', () => {
            const errorBody = {error: 'Something went wrong'};

            beforeEach(() => {
                cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                cy.intercept('GET', accountDetailsUrl, {
                    statusCode: 500,
                    body: errorBody,});
                cy.stub(window.console, 'error').as('consoleError')
            });

            it('should return null', async () => {
                expect(await AccountClient.loadAccountDetails(agreementId)).to.be.null;
                cy.get('@consoleError').should('be.calledWith', errorBody);
            });
        });

        describe('with no session cookie', () => {
            beforeEach(() => {
                cy.stub(window.console, 'error').as('consoleError')
            });

            it('should return null', async () => {
                expect(await AccountClient.loadAccountDetails(agreementId)).to.be.null;
                cy.get('@consoleError').should('be.calledWith', "No session cookie found");
            });
        });
    });
});