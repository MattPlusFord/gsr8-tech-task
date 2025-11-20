import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionClient } from "../../api/auth/authClient";
import BasePage from "../../components/layout/basePage/BasePage.tsx";
import './customer-select.css';


export const CustomerSelectPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const result = await SessionClient.startSession(email);
            result ? navigate("/") : setError("Invalid email address");
        } catch {
            setError("Invalid email address");
        }
    };

    return (
        <BasePage>
            <div className="customer-select-wrapper">
                <form className='customer-select' onSubmit={handleSubmit}>
                    <label htmlFor={'email'}>
                        Enter customer email address
                    </label>
                    <input
                        id='email'
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Continue</button>
                    {error && <div className={'error-label'}>{error}</div>}
                </form>
            </div>
        </BasePage>
    );
};

export default CustomerSelectPage;
