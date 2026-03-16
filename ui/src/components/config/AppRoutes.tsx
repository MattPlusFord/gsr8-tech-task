import {ReactNode} from "react";
import CustomerSelectPage from "../../pages/customer-select/CustomerSelectPage.tsx";
import LandingPage from "../../pages/landingPage/LandingPage.tsx";
import AgreementDetailsPage from "../../pages/accountDetails/AgreementDetailsPage.tsx";

export type RouteConfig = {
    path: string;
    component: ReactNode;
}

export class AppRoutes {
    static secureRoutes: RouteConfig[] = [
        {
            path: '/agreement/:id',
            component: <AgreementDetailsPage/>,
        },
        {
            path: '*',
            component: <LandingPage/>,
        }
    ];
    static unsecureRoutes: RouteConfig[] = [{
            path: '/customer-select',
            component: <CustomerSelectPage />,
        }
    ];
}
