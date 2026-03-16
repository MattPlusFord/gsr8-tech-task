import accountClient from "../../../api/account/accountClient.ts";
import ChangeDueDateForm from "./ChangeDueDateForm.tsx";

describe('Change Payment Date', () => {
    it('should render the header', () => {
        cy.mount(<ChangeDueDateForm completionCallback={() => {}} agreementId={'1'} currentDate={3} closeCallback={() => {}} />);
        cy.get('h2').contains('Select a new payment date').should('be.visible');
    });

    it('should have the input field for date selection', () => {
        cy.mount(<ChangeDueDateForm completionCallback={() => {}} agreementId={'1'} currentDate={3} closeCallback={() => {}} />);
        cy.get('#paymentDate[type="number"]').should('exist');
    });

    it('should not allow a value greater than 31 in the input', () => {
        cy.mount(<ChangeDueDateForm completionCallback={() => {}} agreementId={'1'} currentDate={3} closeCallback={() => {}} />);
        cy.get('#paymentDate').clear().type('31')
            .invoke('val')
            .then(val => val !== undefined ? +val : new Error('Value is undefined'))
            .should('be.lt', 32);
    });

    it('should call the callback when the date is changed', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy');
        cy.mount(<ChangeDueDateForm completionCallback={onChangeSpy} agreementId={'1'} currentDate={3} closeCallback={() => {}} />);
        const newDate = '12';
        cy.stub(accountClient, 'updatePaymentDate').callsFake(() => Promise.resolve(true));
        cy.get('#paymentDate').clear().type(newDate).should('have.value', newDate);
        cy.get('button.modal--confirm').click();
        cy.get('@onChangeSpy').should('have.been.called');
    });
});