import HeroCard from "./HeroCard.tsx";

describe("HeroCard", () => {
    describe("displays correctly", () => {
        const userName = 'John Doe';
        beforeEach(() => {
            cy.mount(<HeroCard userName={userName} />)
        });

        it("should show the user name that is passed in", () => {
            cy.get("h1").contains(userName);
        });
    });
});
