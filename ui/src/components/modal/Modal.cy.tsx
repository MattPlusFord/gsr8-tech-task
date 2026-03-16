import Modal from "./Modal.tsx";

describe("Modal", () => {
    const modalChildContent = 'Modal Content';

    describe('render', () => {
        describe('when isOpen is false', () => {
            beforeEach(() => {
                cy.mount(
                    <Modal isOpen={false}>
                        <div>{modalChildContent}</div>
                    </Modal>
                );
            });

            it('should not display the modal', () => {
                cy.get('.modal').should('not.exist');
            });
        });

        describe('when isOpen is true', () => {
            beforeEach(() => {
                cy.mount(
                    <Modal isOpen={true}>
                        <div>{modalChildContent}</div>
                    </Modal>
                );
            });

            it('should display the modal overlay', () => {
                cy.get('.modal--overlay').should('exist');
            });

            it('should display the modal', () => {
                cy.get('.modal').should('exist');
            });

            it('should render the child content in the modal', () => {
                cy.get('.modal').contains(modalChildContent).should('exist');
            });
        });
    });
});