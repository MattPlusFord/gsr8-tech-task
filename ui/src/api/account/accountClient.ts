import {BaseClient} from "../baseClient.ts";
import {AccountDetails, AccountOverview} from "../../types/accounts.ts";

export class AccountClient {
    static loadAccountListForUser = (): Promise<AccountOverview[] | null> => {
        return BaseClient.authenticatedRequest(`/agreements`)
            .then(res => {
                if (!res) return null;
                if (res.ok) {
                    return res.json()
                }
                console.error(res.body);
                return null;
            }).catch(res => {
                console.error(res);
                return null;
            });
    }

    static loadAccountDetails = (agreementId: string): Promise<AccountDetails | null> => {
        return BaseClient.authenticatedRequest(`/agreements/${agreementId}`)
            .then(res => {
                if (!res) return null;
                if (res.ok) {
                    return res.json()
                }
                console.error(res.body);
                return null;
            }).catch(res => {
                console.error(res);
                return null;
            });
    }

    static updatePaymentDate = (agreementId: string, newPaymentDate: number): Promise<boolean> => {
        return BaseClient.authenticatedRequest(`/agreements/${agreementId}/payment-date`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newPaymentDate })
        }).then(res => {
            if (!res) return false;
            if (res.ok) return true;
            console.error(res.body);
            return false;
        }).catch(res => {
            console.error(res);
            return false;
        });
    }
}

export default AccountClient;