import userClient from "./userClient.ts";

describe('UserClient', () => {
    describe('loadUser', () => {
        describe('successful response', () => {
            describe('with valid data', () => {
                const validUserData = {
                    "id": 1,
                    "name": "John Doe",
                    "email": "john.doe@ford.com"
                };

                beforeEach(() => {
                    cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                    cy.intercept('GET', `${import.meta.env.VITE_API_BASE_URL}/users/details`, {
                        statusCode: 200,
                        body: validUserData,});
                });

                it('should return user data', async () => {
                    expect(await userClient.loadUser()).to.deep.equal(validUserData);
                });
            });

            describe('with invalid response data', () => {
                const invalidUserData = 'j.doe@ford.com';

                beforeEach(() => {
                    cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                    cy.intercept('GET', `${import.meta.env.VITE_API_BASE_URL}/users/details`, {
                        statusCode: 200,
                        body: invalidUserData,});
                });

                it('should return null', async () => {
                    expect(await userClient.loadUser()).to.be.null;
                });
            });
        });

        describe('unsuccessful response', () => {
            const errorBody = {error: 'Something went wrong'};

            beforeEach(() => {
                cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                cy.intercept('GET', `${import.meta.env.VITE_API_BASE_URL}/users/details`, {
                    statusCode: 500,
                    body: errorBody,});
            });

            it('should return null', async () => {
                expect(await userClient.loadUser()).to.be.null;
            });
        });

        describe('with no session cookie', () => {
            it('should return null', async () => {
                expect(await userClient.loadUser()).to.be.null;
            });
        });
    });
});