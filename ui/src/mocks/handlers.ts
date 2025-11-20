import {createSession} from "./auth.ts";
import {loadUser} from "./users.ts";


export const handlers = () => [
    createSession,
    loadUser
];
