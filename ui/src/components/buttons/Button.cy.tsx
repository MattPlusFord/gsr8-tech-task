import Button from "./Button.tsx";

describe('Button', () => {
    it('should display the correct label', () => {
        const label = 'Click Me';
        cy.mount(<Button label={label} onClick={() => {}} />);
        cy.get('button').should('have.text', label);
    });

    it('should call onClick when clicked', () => {
        const onClickSpy = cy.spy().as('onClickSpy');
        cy.mount(<Button label="Click Me" onClick={onClickSpy} />);
        cy.get('button').click();
        cy.get('@onClickSpy').should('have.been.calledOnce');
    });

    it('should be disabled when disabled prop is true', () => {
        cy.mount(<Button label="Click Me" onClick={() => {}} disabled={true} />);
        cy.get('button').should('be.disabled');
    });
});