import React, {useEffect, useState} from 'react';
import carPlaceholder from '../../assets/images/car_placeholder.jpg';
import {useParams} from "react-router-dom";
import BasePage from "../../components/layout/basePage/BasePage.tsx";
import AccountClient from "../../api/account/accountClient.ts";
import {AccountOverview} from "../../types/accounts.ts";
import Card from "../../components/cards/Card.tsx";
import './agreement.css';

const AccountDetails: React.FC = () => {
    const {id} = useParams();
    const [accountDetails, setAccountDetails] = useState<AccountOverview>();
    const [accountLoadError, setAccountLoadError] = useState<boolean>(false);

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

    const renderPageBody = () => {
        if (accountDetails) {
            return (
                <div id={`user-agreement-${accountDetails?.id}`} className='agreement'>
                    <div className="agreement__details">
                        <p className="agreement__detail-row"><span className='agreement__detail-heading'>Account number:</span> <span>{accountDetails?.id}</span></p>
                        <p className="agreement__detail-row"><span className='agreement__detail-heading'>Balance:</span> <span>£{accountDetails?.balance}</span></p>
                        <p className="agreement__detail-row"><span className='agreement__detail-heading'>Interest rate:</span> <span>{accountDetails?.interestRate}%</span></p>
                    </div>
                    <div className="agreement__image">
                        <img src={carPlaceholder} alt="Image of agreement vehicle" />
                    </div>
                </div>
            )
        } else if (accountLoadError) {
            return (
                <div className="account-list">
                    <Card>
                        <h1>Sorry, we've been unable to find your finance accounts</h1>
                    </Card>
                </div>
            );
        } else {
            return (
                <div className="account-list">
                    <Card>
                        <h1>Loading</h1>
                    </Card>
                </div>
            );
        }
    };

    return (
        <BasePage>
            {renderPageBody()}
        </BasePage>
    );
};

export default AccountDetails;