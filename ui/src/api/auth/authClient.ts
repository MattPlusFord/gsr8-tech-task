import { BaseClient } from '../baseClient';

export class SessionClient {
    static startSession = (): Promise<boolean | null> => {
        return BaseClient.unauthenticatedRequest('/session',
            { method: 'POST', credentials: 'include' })
            .then(res => {
                if (res.ok) {
                    return true;
                } else {
                    const errorBody = res.json();
                    console.error(errorBody);
                    return null;
                }
            }).catch(err => {
                console.error(err);
                return null;
            });
    }
}

export default SessionClient;
