import {User} from "./users.ts";

export type AccountOverview = {
    id: string;
    user: User;
    registration: string;
    make: string;
    model: string;
    variant: string;
    year: number;
}

export type AccountDetails = AccountOverview & {
    balance: number;
    interestRate: number;
}
