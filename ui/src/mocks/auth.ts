import {rest} from "msw";

const mockUsers = {
    "1": {id: "1", email: "john.doe@ford.com", name: "John Doe"},
    "2": {id: "2", email: "jane.doe@ford.com", name: "Jane Doe"},
    "3": {id: "3", email: "stan.smith@ford.com", name: "Stan Smith"},
    "4": {id: "4", email: "john.dorian@ford.com", name: "John Dorian"},
    "5": {id: "5", email: "terry.jeffords@ford.com", name: "Terry Jeffords"},
}

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
