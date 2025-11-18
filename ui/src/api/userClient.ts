export class UserClient {
    static loadUser = (userId: string) => {
        return fetch(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`, {})
            .then(res => {
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

export default UserClient