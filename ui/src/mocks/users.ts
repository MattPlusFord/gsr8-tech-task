import {rest} from "msw";

export const mockUsers = {
    "1": {id: "1", email: "john.doe@ford.com", name: "John Doe"},
    "2": {id: "2", email: "jane.doe@ford.com", name: "Jane Doe"},
    "3": {id: "3", email: "stan.smith@ford.com", name: "Stan Smith"},
    "4": {id: "4", email: "john.dorian@ford.com", name: "John Dorian"},
    "5": {id: "5", email: "terry.jeffords@ford.com", name: "Terry Jeffords"},
}

export const loadUser = rest.get(
    `**/users/details`,
    (req, data, ctx) => {
        const reqHeaders= req.headers;
        const sessionValue: string | null = (reqHeaders.get('x-user-id'));
        if (!sessionValue) {
            return data(ctx.delay(1000), ctx.status(401), ctx.json({error: "Unauthorized"}));
        }
        return data(ctx.delay(1000), ctx.status(200), ctx.json(mockUsers[sessionValue as keyof typeof mockUsers]));
    }
);