import AccountList from "./AccountList.tsx";
import CookieUtils from "../../utils/cookies.ts";
import {MountLayer} from "../../../cypress/support/component.tsx";

describe('AccountList', () => {
    describe('renders', () => {
        const user = {id: "1", email: "john.doe@ford.com", name: "John Doe"}
        const accountListUrl = `**/agreements`;
        const validAccountData = [
            {
                'id': "1",
                'user': user,
                'registration': 'AB12 CDE',
                'make': 'Ford',
                'model': 'Focus',
                'variant': 'Zetec',
                'year': 2020
            }, {
                'id': "2",
                'user': user,
                'registration': 'AB12 CDE',
                'make': 'Ford',
                'model': 'Fiesta',
                'variant': 'ST',
                'year': 2020
            }
        ];

        beforeEach(() => {
            cy.stub(CookieUtils, 'getCookieValue').callsFake(() => {return 'test-cookie'});
            cy.intercept('GET', accountListUrl, {
                statusCode: 200,
                body: validAccountData,});
            cy.mountWith(<></>, [MountLayer.Router, MountLayer.Routes], { router: {initialEntries: ['/'] , routes: [{path: '/', component: <AccountList />}]}} );
        });

        it.only('should show all the agreements', () => {
            cy.contains(`${validAccountData[0].registration}`).should('be.visible');
            cy.contains(`${validAccountData[1].registration}`).should('be.visible');
        });
    });
});