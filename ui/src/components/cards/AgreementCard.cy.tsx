import AgreementCard from "./AgreementCard.tsx";

describe('AgreementCard', () => {
    describe('renders', () => {
        const agreementId = '1';
        const balance = 15000;
        const interestRate = 3.5;

        beforeEach (() => {
            cy.mount(<AgreementCard id={agreementId} balance={balance} interestRate={interestRate} />)
        });

        it('should show the vehicle image', () => {
            cy.get(`#user-agreement-${agreementId} img`).should('have.attr', 'alt', 'Image of agreement vehicle');
        });

        it('should show the agreement id', () => {
            cy.contains(`Account number: ${agreementId}`).should('be.visible');
        });

        it('should show the balance', () => {
            cy.contains(`${balance}`).should('be.visible');
        });

        it('should show the interest rate', () => {
            cy.contains(`${interestRate}`).should('be.visible');
        });
    });
});