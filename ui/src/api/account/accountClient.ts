import {BaseClient} from "../baseClient.ts";
import {AccountOverview} from "../../types/accounts.ts";

export class AccountClient {
    static loadAccountListForUser = (): Promise<AccountOverview[] | null> => {
        return BaseClient.authenticatedRequest(`/users/accounts`)
            .then(res => {
                if (!res) return null;
                console.log(20,res);
                if (res.ok) {
                    return res.json()
                }
                console.log(30)
                console.error(res.body);
                return null;
            }).catch(res => {
                console.error(res);
                return null;
            });
    }
}

export default AccountClient;