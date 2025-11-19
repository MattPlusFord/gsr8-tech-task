import {BaseClient} from "../baseClient.ts";
import {User} from "../../types/users.ts";

export class UserClient {
    static loadUser = (): Promise<User | null> => {
        return BaseClient.authenticatedRequest(`/users/details`)
            .then(res => {
                if (!res) return null;
                if (res.ok) {
                    return res.json()
                } else {
                    console.error(res.body);
                    return null;
                }
            })
            .catch(res => {
                console.error(res);
                return null;
            });
    }
}

export default UserClient;
