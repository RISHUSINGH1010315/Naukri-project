// src/components/ErrorBoundary.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button'; // Assuming you're using shadcn/ui

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You can log errors to an error tracking service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
          <div className="max-w-md w-full space-y-4 p-6 rounded-lg border border-destructive bg-destructive/10">
            <h2 className="text-2xl font-bold text-destructive">Something went wrong</h2>
            <p className="text-sm">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Try again
              </Button>
              <Button
                variant="destructive"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook-based wrapper for functional components
export const withErrorBoundary = (Component) => (props) => (
  <ErrorBoundary>
    <Component {...props} />
  </ErrorBoundary>
);

export default ErrorBoundary;