import './components/layout/layout.css';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AuthGuard from "./components/auth/AuthGuard.tsx";
import ErrorBoundary from "./components/errors/ErrorBoundary.tsx";

export const App = () => {
    const errorSupportUrl = import.meta.env.VITE_ERROR_SUPPORT_DOMAIN;

    return (
        <>
            <ErrorBoundary supportUrl={errorSupportUrl}>
                <BrowserRouter>
                    <AuthGuard redirectPath={'/customer-select'}>
                        <></>
                    </AuthGuard>
                </BrowserRouter>
            </ErrorBoundary>
        </>
    )
}

export default App;