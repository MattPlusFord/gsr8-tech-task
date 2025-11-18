import Footer from "./Footer.tsx";

describe("Footer", () => {
    describe("displays correctly", () => {
        beforeEach(() => {
            cy.mount(<Footer />)
        });

        describe('renders correctly', () => {
            it('should render the footer component', () => {
                cy.get('div.footer').should('exist');
            });
        });

        describe("renders all footer items", () => {
            it("should show the copyright notification", () => {
                cy.get("p").contains("©Fawd Credit Europe 2025");
            });
        });
    });
});
