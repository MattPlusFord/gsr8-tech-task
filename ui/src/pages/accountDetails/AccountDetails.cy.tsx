import AgreementDetailsPage from "./AgreementDetailsPage.tsx";
import {MountLayer} from "../../../cypress/support/component.tsx";

const agreementId = '1';
const balance = 15000;
const interestRate = 3.5;

describe('AccountDetails page', () => {
    const validAccountDetails = {
        'id': agreementId,
        'user': {id: "1", email: "john.doe@ford.com", name: "John Doe"},
        'balance': balance,
        'interestRate': interestRate,
    };
    const accountDetailsUrl = `**/agreements/${agreementId}`;
    beforeEach(() => {
        cy.setCookie('fawdSession', 'valid-session-token', {secure: true, httpOnly: false, sameSite: 'no_restriction'});
        cy.intercept('GET', accountDetailsUrl, {
            statusCode: 200,
            body: validAccountDetails,}).as('agreementsApi');
    });

    describe('mount', () => {
       beforeEach(() => {
           cy.mountWith(<></>, [MountLayer.Routes], {
               router: {
                   initialEntries: [`/agreement/${agreementId}`],
                   routes: [
                       {
                           path: `/agreement/:id`,
                           component: <AccountDetails/>
                       }
                   ]
               }
           });
       });

       it('should load the agreement details from the api', () => {
           cy.wait('@agreementsApi').then(interception => {
              expect(interception.request.url).to.include(`/agreements/${agreementId}`);
              expect(interception.response?.statusCode).to.equal(200);
              expect(interception.response?.body).to.deep.equal(validAccountDetails);
           });
       })
    });

    describe('render', () => {
        beforeEach(() => {
            cy.mountWith(<></>, [MountLayer.Routes], {
                router: {
                    initialEntries: [`/agreement/${agreementId}`],
                    routes: [
                        {
                            path: `/agreement/:id`,
                            component: <AccountDetails/>
                        }
                    ]
                }
            });
        });

        it('should show the vehicle image', () => {
            cy.get(`#user-agreement-${agreementId} img`).should('have.attr', 'alt', 'Image of agreement vehicle');
        });

        it('should show the agreement id', () => {
            cy.contains(`Account number: ${agreementId}`).should('be.visible');
        });

        it('should show the balance', () => {
            cy.contains(`${balance}`).should('be.visible');
        });

        it('should show the interest rate', () => {
            cy.contains(`${interestRate}`).should('be.visible');
        });
    });
});