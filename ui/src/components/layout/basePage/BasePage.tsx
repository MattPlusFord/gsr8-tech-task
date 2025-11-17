import React from "react";
import { useInRouterContext } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const BasePage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!useInRouterContext()) {
        console.error("Base page must be used within a Router context");
        throw new Error("Base page must be used within a Router context");
    }

    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default BasePage;
