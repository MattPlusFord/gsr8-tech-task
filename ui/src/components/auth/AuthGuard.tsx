import React, {useEffect} from "react";
import {useNavigate, useInRouterContext, useLocation} from "react-router-dom";
import CookieUtils from "../../utils/cookies.ts";

type AuthGuardProps = {
    children: React.ReactNode,
    redirectPath: string,
    unauthedRoutes?: string[]
};

const AuthGuard: React.FC<AuthGuardProps> = ({children, redirectPath, unauthedRoutes}) => {
    if (!useInRouterContext()) {
        console.error("AuthGuard must be used within a Router context");
        throw new Error("AuthGuard must be used within a Router context");
    }

    let currentPath = useLocation();

    const hasSession = CookieUtils.getCookieValue('fawdSession') !== undefined;

    const navigate = useNavigate();

    useEffect(() => {
        if (!hasSession && (!unauthedRoutes?.includes(currentPath.pathname))) {
            navigate(redirectPath, {replace: true});
        }
    }, [hasSession, navigate, redirectPath, currentPath]);

    return <>{children}</>;
};

export default AuthGuard;
