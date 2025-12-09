import ChangeDueDateForm from "./ChangeDueDateForm.tsx";

describe('Change Payment Date', () => {
    it('should render the header', () => {
        cy.mount(<ChangeDueDateForm changeCallback={() => {}}/>);
        cy.get('h2').contains('Select a new payment date').should('be.visible');
    });

    it('should have the input field for date selection', () => {
        cy.mount(<ChangeDueDateForm changeCallback={() => {}}/>);
        cy.get('#paymentDate[type="number"]').should('exist');
    });

    it('should not allow a value greater than 31 in the input', () => {
        cy.mount(<ChangeDueDateForm changeCallback={() => {}}/>);
        cy.get('#paymentDate').type('31')
            .invoke('val')
            .then(val => +val)
            .should('be.lt', 32);
        cy.get('#paymentDate').type('32').should('not.have.value', '32');
    });

    it('should call the callback when the date is changed', () => {
        const onChangeSpy = cy.spy().as('onChangeSpy');
        cy.mount(<ChangeDueDateForm changeCallback={onChangeSpy}/>);
        const newDate = '12';
        cy.get('#paymentDate').type(newDate).should('have.value', newDate);
        cy.get('@onChangeSpy').should('have.been.calledTwice');
    });
});