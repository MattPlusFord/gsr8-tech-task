import {AccountClient} from "./accountClient.ts";
import {BaseClient} from "../baseClient.ts";

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
            });

            it('should return null', async () => {
                expect(await AccountClient.loadAccountListForUser()).to.be.null;
            });
        });

        describe('with no session cookie', () => {
            it('should return null', async () => {
                expect(await AccountClient.loadAccountListForUser()).to.be.null;
            });
        });

        describe('error from baseClient', () => {
            it('should return null', async () => {
                cy.stub(BaseClient, "authenticatedRequest").callsFake(() => {
                    return Promise.reject(new Error("Network error"));
                });
                expect(await AccountClient.loadAccountListForUser()).to.be.null;
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
            });

            it('should return null', async () => {
                expect(await AccountClient.loadAccountDetails(agreementId)).to.be.null;
            });
        });

        describe('with no session cookie', () => {
            it('should return null', async () => {
                expect(await AccountClient.loadAccountDetails(agreementId)).to.be.null;
            });
        });

        describe('error from baseClient', () => {
            it('should return null', async () => {
                cy.stub(BaseClient, "authenticatedRequest").callsFake(() => {
                    return Promise.reject(new Error("Network error"));
                });
                expect(await AccountClient.loadAccountDetails(agreementId)).to.be.null;
            });
        });
    });

    describe('updatePaymentDate', () => {
        const agreementId = '1';
        const updatePaymentDateUrl = `**/agreements/${agreementId}/payment-date`;

        describe('unsuccessful response', () => {
            describe('with invalid submission data', () => {
                beforeEach(() => {
                    cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                    cy.intercept('PUT', updatePaymentDateUrl, {
                        statusCode: 400,
                        body: {error: 'Invalid date'},});
                });

                it('should return false', async () => {
                    expect(await AccountClient.updatePaymentDate(agreementId, 32)).to.be.false;
                });
            });
        });

        describe('successful response', () => {
            beforeEach(() => {
                cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                cy.intercept('PUT', updatePaymentDateUrl, {
                    statusCode: 202});
            });

            it('should return true', async () => {
                expect(await AccountClient.updatePaymentDate(agreementId, 10)).to.be.true;
            });
        });

        describe('with no session cookie', () => {
            it('should return false', async () => {
                expect(await AccountClient.updatePaymentDate(agreementId, 32)).to.be.false;
            });
        });

        describe('error from baseClient', () => {
            it('should return null', async () => {
                cy.stub(BaseClient, "authenticatedRequest").callsFake(() => {
                    return Promise.reject(new Error("Network error"));
                });
                expect(await AccountClient.updatePaymentDate(agreementId, 32)).to.be.false;
            });
        });
    });
});