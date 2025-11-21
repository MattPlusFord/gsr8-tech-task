import AccountList from "./AccountList.tsx";

describe('AccountList', () => {
    describe('renders', () => {
        const accountListUrl = `**/users/agreements`;
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
            cy.mount(<AccountList />)
        });

        it('should show all the agreements', () => {
            cy.contains(`Account number: ${validAccountData[0].id}`).should('be.visible');
            cy.contains(`Account number: ${validAccountData[1].id}`).should('be.visible');
        });
    });
});