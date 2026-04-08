// @ts-nocheck
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", _error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state as State;
    const { children } = this.props as Props;

    if (hasError) {
      return (
        <div style={{ padding: "2rem", color: "red", backgroundColor: "black", minHeight: "100vh" }}>
          <h1>Something went wrong.</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>{error?.toString()}</pre>
        </div>
      );
    }

    return children ?? null;
  }
}
