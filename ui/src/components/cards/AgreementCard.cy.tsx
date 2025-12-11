import AgreementCard from "./AgreementCard.tsx";
import {MountLayer} from "../../../cypress/support/component.tsx";
import {Route, Routes} from "react-router-dom";

const agreementId = '1';
const registration = 'ABC123';
const make = 'Ford';
const model = 'Focus';
const variant = 'Zetec';
const year = 2020;

const agreement = {
    id: agreementId,
    user: {id: "2", email: "jane.doe@ford.com", name: "Jane Doe"},
    registration: registration,
    make: make,
    model: model,
    variant: variant,
    year: year
}

const mountAgreementCard = () => {
    cy.mountWith(
        <Routes>
            <Route path={`/`} element={<AgreementCard agreement={agreement} />}/>
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

        it('should show the registration', () => {
            cy.contains(registration).should('be.visible');
        });

        it('should show the make', () => {
            cy.contains(make).should('be.visible');
        });

        it('should show the model', () => {
            cy.contains(model).should('be.visible');
        });

        it('should show the variant', () => {
            cy.contains(variant).should('be.visible');
        });

        it('should show the year', () => {
            cy.contains(year).should('be.visible');
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