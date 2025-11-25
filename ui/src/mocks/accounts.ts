import {rest} from "msw";
import {mockUsers} from "./users.ts";

export const mockAccountsOverview = {
'1': {'id': '1', 'user': mockUsers['5'], 'balance': 17653.91, 'interestRate': 6.3, 'registration': 'AB12 CDE', 'make': 'Ford', 'model': 'Fiesta', 'variant': 'ST-Line', 'year': '2020'},
'2': {'id': '2', 'user': mockUsers['5'], 'balance': 1257.43, 'interestRate': 4.1, 'registration': 'XY34 ZZT', 'make': 'Ford', 'model': 'Puma', 'variant': '', 'year': '2019'},
'3': {'id': '3', 'user': mockUsers['5'], 'balance': 22856.93, 'interestRate': 6.3, 'registration': 'LM56 NOP', 'make': 'Ford', 'model': 'Mustang', 'variant': '', 'year': '2021'},
'4': {'id': '4', 'user': mockUsers['3'], 'balance': 18249.24, 'interestRate': 5.3, 'registration': 'GH78 IJK', 'make': 'Ford', 'model': 'Explorer', 'variant': 'ST', 'year': '2022'},
'5': {'id': '5', 'user': mockUsers['3'], 'balance': 34835.33, 'interestRate': 6.3, 'registration': 'QR90 STU', 'make': 'Ford', 'model': 'Capri', 'variant': '', 'year': '1974'},
'6': {'id': '6', 'user': mockUsers['2'], 'balance': 10276.74, 'interestRate': 3.6, 'registration': 'EF12 GHI', 'make': 'Ford', 'model': 'Mach-E', 'variant': '', 'year': '2021'},
'7': {'id': '7', 'user': mockUsers['1'], 'balance': 9342.26, 'interestRate': 6.2, 'registration': 'UV34 WXY', 'make': 'Ford', 'model': 'Focus', 'variant': 'ST-Line', 'year': '2019'},
'8': {'id': '8', 'user': mockUsers['1'], 'balance': 210.67, 'interestRate': 6.3, 'registration': 'ZA56 BCD', 'make': 'Ford', 'model': 'Puma', 'variant': 'Gen-E', 'year': '2020'},
'9': {'id': '9', 'user': mockUsers['1'], 'balance': 46759.34, 'interestRate': 6.4, 'registration': 'EF78 GHI', 'make': 'Ford', 'model': 'Fiesta', 'variant': '', 'year': '2018'},
'10': {'id': '10', 'user': mockUsers['5'], 'balance': 21000.99, 'interestRate': 5.8, 'registration': 'JK90 LMN', 'make': 'Ford', 'model': 'Explorer', 'variant': '', 'year': '2012'},
}

export const loadAccountListForUser = rest.get(
    `**/agreements`,
    (req, data, ctx) => {
        const reqHeaders= req.headers;
        const sessionValue: string | null = (reqHeaders.get('x-user-id'));
        if (!sessionValue) {
            return data(ctx.delay(1000), ctx.status(401), ctx.json({error: "Unauthorized"}));
        }
        const userAccounts = Object.values(mockAccountsOverview).filter(account => account.user.id === sessionValue);
        return data(ctx.delay(1000), ctx.status(200), ctx.json(userAccounts));
    }
);

export const loadAccountDetails = rest.get(
    `**/agreements/*`,
    (req, data, ctx) => {
        const reqHeaders= req.headers;
        const sessionValue: string | null = (reqHeaders.get('x-user-id'));
        if (!sessionValue) {
            return data(ctx.delay(1000), ctx.status(401), ctx.json({error: "Unauthorized"}));
        }
        const account = mockAccountsOverview[req.params['1'] as keyof typeof mockAccountsOverview];
        if (!account || account.user.id !== sessionValue) {
            return data(ctx.delay(1000), ctx.status(404), ctx.json({error: "Account not found"}));
        }
        return data(ctx.delay(1000), ctx.status(200), ctx.json(account));
    }
);