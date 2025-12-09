import {createSession} from "./auth.ts";
import {loadUser} from "./users.ts";
import {loadAccountDetails, loadAccountListForUser, updatePaymentDate} from "./accounts.ts";


export const handlers = () => [
    createSession,
    loadUser,
    loadAccountListForUser,
    loadAccountDetails,
    updatePaymentDate
];
