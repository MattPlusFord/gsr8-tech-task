import Card from "./Card.tsx";

describe("Card", () => {
    describe("displays correctly", () => {
        beforeEach(() => {
            cy.mount(<Card><p>Test Child Component</p></Card>)
        });

        it("should the child component that is passed in", () => {
            cy.get("p").contains("Test Child Component");
        });
    });
});
