import AgreementCard from "./AgreementCard.tsx";
import {MountLayer} from "../../../cypress/support/component.tsx";
import {Route, Routes} from "react-router-dom";

const agreementId = '1';
const balance = 15000;
const interestRate = 3.5;

const mountAgreementCard = () => {
    cy.mountWith(
        <Routes>
            <Route path={`/`} element={<AgreementCard id={agreementId} balance={balance} interestRate={interestRate} />}/>
            <Route path={`/agreement/:id`} element={<p>Agreement Details</p>}/>
        </Routes>,
        [MountLayer.Router],
        {router: {initialEntries: ['/']}}
    );
}

describe('AgreementCard', () => {
    describe('renders', () => {

        beforeEach (() => {
            mountAgreementCard();
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

    describe('on click', () => {
        beforeEach (() => {
            mountAgreementCard();
        });

        it('should navigate to agreement details page', () => {
            cy.get(`#user-agreement-${agreementId}`).click();
            cy.contains('Agreement Details').should('be.visible');
        });
    });
});