import {useEffect, useState} from "react";
import {AccountOverview} from "../../types/accounts.ts";
import AccountClient from "../../api/account/accountClient.ts";
import FinanceCard from "../cards/AgreementCard.tsx";
import Card from "../cards/Card.tsx";
import './accountList.css';


export const AccountList = () => {
    const [accounts, setAccounts] = useState<undefined|AccountOverview[]>();
    const [accountLoadError, setAccountLoadError] = useState(false);

    useEffect(() => {
        if (!accounts && !accountLoadError) {
            AccountClient.loadAccountListForUser().then(accountData => {
                if (accountData) {
                    setAccounts(accountData);
                } else {
                    setAccountLoadError(true);
                }
            });
        }
    }, [accounts, accountLoadError]);

    if (accounts) {
        return (
            <div className="account-list">
                {accounts.map(account => {
                    return <FinanceCard key={account.id} id={account.id} balance={account.balance} interestRate={account.interestRate} />
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
