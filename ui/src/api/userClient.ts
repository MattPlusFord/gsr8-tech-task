import {getCookieValue} from "../utils/cookies.ts";
import {BaseClient} from "./baseClient.ts";

export class UserClient {
    static loadUser = () => {
        const sessionValue = getCookieValue('fawdSession');
        if (!sessionValue) {
            console.error("No session cookie found");
            return Promise.resolve(null);
        }
        return BaseClient.authenticatedRequest(`/users/details`,
            {
                headers: {'x-user-id': sessionValue}
            })
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
