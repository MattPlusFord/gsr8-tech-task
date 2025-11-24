import {BaseClient} from "../baseClient.ts";
import {AccountOverview} from "../../types/accounts.ts";

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
}

export default AccountClient;