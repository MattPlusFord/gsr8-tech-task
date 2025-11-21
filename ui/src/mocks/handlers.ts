import {createSession} from "./auth.ts";
import {loadUser} from "./users.ts";
import {loadAccountListForUser} from "./accounts.ts";


export const handlers = () => [
    createSession,
    loadUser,
    loadAccountListForUser
];
