import React, { useContext, useEffect } from "react";
import { useNavigate, UNSAFE_NavigationContext } from "react-router-dom";

type AuthGuardProps = {
    children: React.ReactNode;
    redirectPath: string;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children, redirectPath }) => {
    const routerContext = useContext(UNSAFE_NavigationContext);

    if (!routerContext) {
        console.error("AuthGuard must be used within a Router context");
        return null;
    }

    const hasSession = document.cookie
        .split("; ")
        .some((cookie) => cookie.startsWith("fawdSession="));

    const navigate = useNavigate();

    useEffect(() => {
        if (!hasSession) {
            navigate(redirectPath, { replace: true });
        }
    }, [hasSession, navigate, redirectPath]);

    if (!hasSession) {
        return null;
    }

    return <>{children}</>;
};

export default AuthGuard;