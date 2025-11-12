import './components/layout/layout.css';
import './App.css';
import ErrorBoundary from "./components/errors/ErrorBoundary.tsx";

export const App = () => {
    const errorSupportUrl = import.meta.env.VITE_ERROR_SUPPORT_DOMAIN;

    return (
        <>
            <ErrorBoundary supportUrl={errorSupportUrl}>
                <></>
            </ErrorBoundary>
        </>
    )
}

export default App;