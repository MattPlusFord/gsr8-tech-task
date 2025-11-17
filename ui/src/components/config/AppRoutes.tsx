import {ReactNode} from "react";
import BasePage from "../layout/basePage/BasePage.tsx";

type RouteConfig = {
    path: string;
    component: ReactNode;
}

export class AppRoutes {
    static secureRoutes: RouteConfig[] = [
        {
            path: '/',
            component: <></>,
        }
    ];
    static unsecureRoutes: RouteConfig[] = [{
            path: '/customer-select',
            component: <BasePage><>Test</></BasePage>,
        }
    ];
}
