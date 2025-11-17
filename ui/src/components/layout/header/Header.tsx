import React from "react";
import { Link, useInRouterContext } from "react-router-dom";

const Header: React.FC = () => {
    if (!useInRouterContext()) {
        console.error("Header must be used within a Router context");
        // throw new Error("Header must be used within a Router context");
    }

    return (
        <nav className="header">
            <Link id="company-logo" className="home-icon" to="/">
                Fawd Credit
            </Link>
            <Link id="end-session" className="nav-link" to="/customer-select">
                End Session
            </Link>
        </nav>
    );
};

export default Header;
