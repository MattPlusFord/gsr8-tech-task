import React, {useEffect, useState} from 'react';
import carPlaceholder from '../../assets/images/car_placeholder.jpg';
import {Link, useParams} from "react-router-dom";
import BasePage from "../../components/layout/basePage/BasePage.tsx";
import AccountClient from "../../api/account/accountClient.ts";
import {AccountDetails} from "../../types/accounts.ts";
import Card from "../../components/cards/Card.tsx";
import './agreement.css';
import Button from "../../components/buttons/Button.tsx";
import Modal from "../../components/modal/Modal.tsx";

const AgreementDetailsPage: React.FC = () => {
    const {id} = useParams();
    const [accountDetails, setAccountDetails] = useState<AccountDetails>();
    const [accountLoadError, setAccountLoadError] = useState<boolean>(false);
    const [showChangePaymentDateModal, setShowChangePaymentDateModal] = useState<boolean>(false);

    useEffect(() => {
        if (!id) {
            setAccountLoadError(true);
        } else {
            AccountClient.loadAccountDetails(id).then(accountDetails => {
                if (accountDetails) {
                    setAccountDetails(accountDetails);
                } else {
                    setAccountLoadError(true);
                }
            });
        }
    }, [id]);

    const handleChangePaymentDate = () => {
        setShowChangePaymentDateModal(true);
    };

    const handleCloseModal = () => {
        setShowChangePaymentDateModal(false);
    };

    const renderPageBody = () => {
        if (accountDetails) {
            return (
                <>
                    <Modal
                        isOpen={showChangePaymentDateModal}
                        onClose={handleCloseModal}
                        closeLabel="Close"
                    >
                        Select new payment date
                    </Modal>
                    <div className="agreement__body">
                        <div className="agreement__details">
                            <h1 className="agreement__title">{accountDetails?.registration}</h1>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Make:</span> <span>{accountDetails?.make}</span></p>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Model:</span> <span>{accountDetails?.model}</span></p>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Variant:</span> <span>{accountDetails?.variant}</span></p>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Year:</span> <span>{accountDetails?.year}</span></p>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Account number:</span> <span>{accountDetails?.id}</span></p>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Balance:</span> <span>£{accountDetails?.balance}</span></p>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Interest rate:</span> <span>{accountDetails?.interestRate}%</span></p>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Payment date:</span> <span>{accountDetails?.paymentDate} of each month</span></p>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Monthly payment:</span> <span>£{accountDetails?.monthlyPayment}</span></p>
                            <p className="agreement__detail-row"><span className='agreement__detail-heading'>Contract Length:</span> <span>{accountDetails?.contractLength} years</span></p>
                        </div>
                        <div className="agreement__image">
                            <img src={carPlaceholder} alt="Image of agreement vehicle" />
                            <Button onClick={handleChangePaymentDate} label='Change Payment Date' />
                        </div>
                    </div>
                </>
            );
        } else if (accountLoadError) {
            return (
                <Card>
                    <h1>Sorry, we've been unable to find your finance accounts</h1>
                </Card>
            );
        } else {
            return (
                <Card>
                    <h1>Loading</h1>
                </Card>
            );
        }
    };

    return (
        <BasePage>
            <div id={`user-agreement-${id}`} className='agreement'>
                <Link to={'/'} className='agreement__back'>&larr; Back to agreement list</Link>
                {renderPageBody()}
            </div>
        </BasePage>
    );
};

export default AgreementDetailsPage;
