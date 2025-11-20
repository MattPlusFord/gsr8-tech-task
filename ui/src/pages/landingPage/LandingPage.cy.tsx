import LandingPage from "./LandingPage.tsx";
import {MountLayer} from "../../../cypress/support/component.tsx";

describe("Home Page", () => {
    describe("user data loads", () => {
        describe('successfully', () => {
            const userId = 2;
            const userName = 'Test user';

            beforeEach(() => {
                cy.setCookie('fawdSession', String(userId), {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                cy.intercept(`http://localhost:8080/users/details`, {body: {id: userId, name: userName, email: 'test@ford.com'}});
            });

            it("should render the users name", () => {
                cy.mountWith(<LandingPage />, [MountLayer.Router], {router: {initialEntries: [`?uid=${userId}`]}});
                cy.get("h1").contains(userName);
            });
        });

        describe('unsuccessfully', () => {
            const userId = 2;

            beforeEach(() => {
                cy.setCookie('fawdSession', String(userId), {secure: true, httpOnly: false, sameSite: 'no_restriction'});
                cy.intercept(`http://localhost:8080/users/details`, {statusCode: 404, body: null});
            });

            it("should display the correct error message", () => {
                cy.mountWith(<LandingPage />, [MountLayer.Router], {router: {initialEntries: [`?uid=${userId}`]}});
                cy.get("h1").contains("Sorry, we've been unable to find your user account");
            });
        });
    });
});
