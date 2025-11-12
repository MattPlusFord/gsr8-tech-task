import React from "react";

type ErrorBoundaryProps = {
    children: React.ReactNode;
    supportUrl: string;
};

type ErrorBoundaryState = {
    hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something Went Wrong</h1>
                    <p>
                        Please try again later or{" "}
                        <a href={this.props.supportUrl}>contact us</a>
                        {" "}if the issue continues.
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;