import {rest} from "msw";
import {mockUsers} from "./users.ts";

export const createSession = rest.post(
    `**/session`,
    (req, data, ctx) => {
        const reqBody= req.body?.toString();
        if (!reqBody) {
            return data(ctx.delay(1000), ctx.status(400), ctx.json({error: "Invalid request body"}));
        }
        const {email} = JSON.parse(reqBody);
        const user = Object.values(mockUsers).find(u => u.email === email);
        if (!user) {
            return data(ctx.delay(1000), ctx.status(401), ctx.json({error: "Unauthorized"}));
        }
        document.cookie = `fawdSession=${user.id}; Path=/; Secure; SameSite=None`;
        return data(ctx.delay(1000), ctx.status(200), ctx.json({}));
    }
);
