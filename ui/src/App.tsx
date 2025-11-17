import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ErrorBoundary from "./components/errors/ErrorBoundary.tsx";
import AuthGuard from "./components/auth/AuthGuard.tsx";
import {AppRoutes} from "./components/config/AppRoutes.tsx";

export const App = () => {
    const errorSupportUrl = import.meta.env.VITE_ERROR_SUPPORT_DOMAIN;

    return (
        <>
            <ErrorBoundary supportUrl={errorSupportUrl}>
                <BrowserRouter>
                    <AuthGuard redirectPath={'/customer-select'} unauthedRoutes={AppRoutes.unsecureRoutes.map(route => route.path)}>
                        <Routes>
                            {AppRoutes.secureRoutes?.map((route) => (
                                <Route path={route.path} element={route.component} />
                            ))}
                            {AppRoutes.unsecureRoutes?.map((route) => (
                                <Route path={route.path} element={route.component} />
                            ))}
                        </Routes>
                    </AuthGuard>
                </BrowserRouter>
            </ErrorBoundary>
        </>
    )
}

export default App;