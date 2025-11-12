import ErrorBoundary from "./ErrorBoundary";

const ComponentWithError = () => {
    throw new Error("Test error");
};

const ComponentWithoutError = () => {
    return <div>Non erroring content</div>
};

// eslint-disable-next-line consistent-return
Cypress.on("uncaught:exception", (err) => {
    if (err.message.includes("Test error")) {
        // returning false here prevents Cypress from failing the test
        return false;
    }
});

const supportUrl = 'https://support.ford.com/';

describe("ErrorBoundary", () => {
    describe("when there is an error", () => {
        beforeEach(() => {
            cy.mount(<ErrorBoundary supportUrl={supportUrl}><ComponentWithError /></ErrorBoundary>);
        });

        it("should renders error title", () => {
            cy.contains('Something Went Wrong').should("exist");
        });

        it("should renders support body", () => {
            cy.contains('Please try again later or contact us if the issue continues.').should("exist");
        });

        it("should renders support link", () => {
            cy.get('a').contains('contact us').invoke('attr', 'href').should("eq", supportUrl);
        });
    })

    describe('when there is no error', () => {
        beforeEach(() => {
            cy.mount(<ErrorBoundary supportUrl={supportUrl}><ComponentWithoutError /></ErrorBoundary>);
        });

        it('should render the children correctly', () => {
            cy.contains('Non erroring content').should("exist");
        })
    });
});
