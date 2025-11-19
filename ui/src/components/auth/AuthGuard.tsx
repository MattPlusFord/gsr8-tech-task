import React, {useEffect} from "react";
import {useNavigate, useInRouterContext, useLocation} from "react-router-dom";

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

    const hasSession = document.cookie
        .split("; ")
        .some((cookie) => cookie.startsWith("fawdSession="));

    const navigate = useNavigate();

    useEffect(() => {
        if (!hasSession && (!unauthedRoutes?.includes(currentPath.pathname))) {
            navigate(redirectPath, {replace: true});
        }
    }, [hasSession, navigate, redirectPath, currentPath]);


    return <>{children}</>;
};

export default AuthGuard;
