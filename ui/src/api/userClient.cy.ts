import userClient from "./userClient.ts";

describe('UserClient', () => {
    describe('loadUser', () => {
        describe('successful response', () => {
            describe('with valid data', () => {
                const validUserData = {
                    transactionId: 'transactionId',
                };

                beforeEach(() => {
                    cy.intercept('GET', `${import.meta.env.VITE_API_BASE_URL}/users/*`, {
                        statusCode: 200,
                        body: validUserData,});
                });

                it('should return user data', async () => {
                    expect(await userClient.loadUser('1')).to.deep.equal({transactionId: 'transactionId'});
                });
            });

            describe('with invalid response data', () => {
                const invalidUserData = 'transactionId';

                beforeEach(() => {
                    cy.intercept('GET', `${import.meta.env.VITE_API_BASE_URL}/users/*`, {
                        statusCode: 200,
                        body: invalidUserData,});
                    cy.stub(window.console, 'error').as('consoleError')
                });

                it('should return user data', async () => {
                    expect(await userClient.loadUser('1')).to.be.null;
                    cy.get('@consoleError').should('be.calledWith', invalidUserData);
                });
            });
        });

        describe('unsuccessful response', () => {
            const errorBody = {error: 'Something went wrong'};

            beforeEach(() => {
                cy.intercept('GET', `${import.meta.env.VITE_API_BASE_URL}/users/*`, {
                    statusCode: 500,
                    body: errorBody,});
                cy.stub(window.console, 'error').as('consoleError')
            });

            it('should return user data', async () => {
                expect(await userClient.loadUser('1')).to.be.null;
                cy.get('@consoleError').should('be.calledWith', errorBody);
            });
        });
    });
});