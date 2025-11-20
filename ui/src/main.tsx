import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import {initialiseMocks} from "./mocks/client.ts";

function maybeStartMocks() {
    const enableMocks = import.meta.env.VITE_MOCKS_ENABLED === "true";
    if (enableMocks) return initialiseMocks({onUnhandledRequest: "bypass"});
    return Promise.resolve();
}

(async function bootstrap() {
    await maybeStartMocks();

    ReactDOM.createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
})();
