import {ReactNode} from "react";
import BasePage from "../layout/basePage/BasePage.tsx";
import CustomerSelectPage from "../../pages/customer-select/CustomerSelectPage.tsx";

type RouteConfig = {
    path: string;
    component: ReactNode;
}

export class AppRoutes {
    static secureRoutes: RouteConfig[] = [
        {
            path: '*',
            component: <BasePage><></></BasePage>,
        }
    ];
    static unsecureRoutes: RouteConfig[] = [{
            path: '/customer-select',
            component: <CustomerSelectPage />,
        }
    ];
}
