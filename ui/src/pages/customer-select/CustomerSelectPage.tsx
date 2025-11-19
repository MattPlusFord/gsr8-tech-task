import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionClient } from "../../api/auth/authClient";


export const CustomerSelectPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const result = await SessionClient.startSession();
            result ? navigate("/") : setError("Invalid email address");
        } catch {
            setError("Invalid email address");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Enter customer email address
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Continue</button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default CustomerSelectPage;
