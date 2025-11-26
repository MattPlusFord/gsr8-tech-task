import Modal from "./Modal.tsx";

describe("Modal", () => {
    const modalChildContent = 'Modal Content';
    const modalCloseLabel = 'Cancel';

    describe('render', () => {
        describe('when isOpen is false', () => {
            beforeEach(() => {
                cy.mount(
                    <Modal isOpen={false} onClose={() => {}} closeLabel={modalCloseLabel}>
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
                    <Modal isOpen={true} onClose={() => {}} closeLabel={modalCloseLabel}>
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

            it('should render a close button with close label displayed', () => {
                cy.get('.modal').get('button.modal--close').contains(modalCloseLabel).should('exist');
            });
        });
    });

    describe('close', () => {
        it('should call onClose when close button is clicked', () => {
            const onCloseSpy = cy.spy().as('onCloseSpy');
            cy.mount(
                <Modal isOpen={true} onClose={onCloseSpy} closeLabel={modalCloseLabel}>
                    <div>{modalChildContent}</div>
                </Modal>
            );
            cy.get('button.modal--close').click();
            cy.get('@onCloseSpy').should('have.been.calledOnce');
        });
    });
});