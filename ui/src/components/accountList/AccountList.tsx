import {useEffect, useState} from "react";
import {AccountOverview} from "../../types/accounts.ts";
import AccountClient from "../../api/account/accountClient.ts";
import AgreementCard from "../cards/AgreementCard.tsx";
import Card from "../cards/Card.tsx";
import './accountList.css';


export const AccountList = () => {
    const [agreements, setAgreements] = useState<undefined|AccountOverview[]>();
    const [accountLoadError, setAccountLoadError] = useState(false);

    useEffect(() => {
        if (!agreements && !accountLoadError) {
            AccountClient.loadAccountListForUser().then(accountData => {
                if (accountData) {
                    setAgreements(accountData);
                } else {
                    setAccountLoadError(true);
                }
            });
        }
    }, [agreements, accountLoadError]);

    if (agreements) {
        return (
            <div className="account-list">
                {agreements.map(agreement => {
                    return <AgreementCard key={agreement.id} agreement={agreement} />
                })}
            </div>
        );
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
}

export default AccountList;
