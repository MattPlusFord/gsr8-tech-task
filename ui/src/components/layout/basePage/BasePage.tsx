import React from "react";
import { useInRouterContext } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./base-page.css";

const BasePage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!useInRouterContext()) {
        console.error("Base page must be used within a Router context");
        throw new Error("Base page must be used within a Router context");
    }

    return (
        <div className='page'>
            <Header />
            <main className='page-body'>{children}</main>
            <Footer />
        </div>
    );
};

export default BasePage;
