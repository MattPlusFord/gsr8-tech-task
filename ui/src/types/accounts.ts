import {User} from "./users.ts";

export type AccountOverview = {
    id: string;
    user: User;
    balance: number;
    interestRate: number;
}
