import AgreementDetailsPage from "./AgreementDetailsPage.tsx";
import {MountLayer} from "../../../cypress/support/component.tsx";

describe('Agreement Details Page', () => {
    const validAccountDetails = {
        'id': '1',
        'user': {id: "1", email: "john.doe@ford.com", name: "John Doe"},
        'balance': 15000,
        'interestRate': 3.5,
        'registration': 'AB12 CDE',
        'make': 'Ford',
        'model': 'Fiesta',
        'variant': 'ST-Line',
        'year': '2020',
        'paymentDate': '3rd',
        'contractLength': 3,
        'monthlyPayment': 245.48
    };
    const accountDetailsUrl = `**/agreements/${validAccountDetails.id}`;
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
                   initialEntries: [`/agreement/${validAccountDetails.id}`],
                   routes: [
                       {
                           path: `/agreement/:id`,
                           component: <AgreementDetailsPage/>
                       }
                   ]
               }
           });
       });

       it('should load the agreement details from the api', () => {
           cy.wait('@agreementsApi').then(interception => {
              expect(interception.request.url).to.include(`/agreements/${validAccountDetails.id}`);
              expect(interception.response?.statusCode).to.equal(200);
              expect(interception.response?.body).to.deep.equal(validAccountDetails);
           });
       })
    });

    describe('render', () => {
        beforeEach(() => {
            cy.mountWith(<></>, [MountLayer.Routes], {
                router: {
                    initialEntries: [`/agreement/${validAccountDetails.id}`],
                    routes: [
                        {
                            path: `/agreement/:id`,
                            component: <AgreementDetailsPage/>
                        }
                    ]
                }
            });
        });

        it('should show the vehicle image', () => {
            cy.get(`#user-agreement-${validAccountDetails.id} img`).should('have.attr', 'alt', 'Image of agreement vehicle');
        });

        it('should show the agreement id', () => {
            cy.contains(`Account number: ${validAccountDetails.id}`).should('be.visible');
        });

        it('should show the balance', () => {
            cy.contains(`${validAccountDetails.balance}`).should('be.visible');
        });

        it('should show the registration', () => {
            cy.contains(`${validAccountDetails.registration}`).should('be.visible');
        });

        it('should show the make', () => {
            cy.contains(`${validAccountDetails.make}`).should('be.visible');
        });

        it('should show the model', () => {
            cy.contains(`${validAccountDetails.model}`).should('be.visible');
        });

        it('should show the variant', () => {
            cy.contains(`${validAccountDetails.variant}`).should('be.visible');
        });

        it('should show the year', () => {
            cy.contains(`${validAccountDetails.year}`).should('be.visible');
        });

        it('should show the interest rate', () => {
            cy.contains(`${validAccountDetails.interestRate}`).should('be.visible');
        });

        it('should show the payment date', () => {
            cy.contains(`${validAccountDetails.paymentDate}`).should('be.visible');
        });

        it('should show the monthly payment', () => {
            cy.contains(`${validAccountDetails.monthlyPayment}`).should('be.visible');
        });

        it('should show the contract length', () => {
            cy.contains(`${validAccountDetails.contractLength}`).should('be.visible');
        });
    });

    describe('change payment date', () => {
        beforeEach(() => {
            cy.mountWith(<></>, [MountLayer.Routes], {
                router: {
                    initialEntries: [`/agreement/${validAccountDetails.id}`],
                    routes: [
                        {
                            path: `/agreement/:id`,
                            component: <AgreementDetailsPage/>
                        }
                    ]
                }
            });
        });

        it('should open the change payment date modal when clicking the button', () => {
            cy.get('.agreement__body button').contains('Change Payment Date').click();
            cy.get('.modal').contains('Select new payment date').should('be.visible');
        });
    });
});