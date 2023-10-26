import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // update state so the next render will show the fallback UI
  static getDerivedStateFromError(error: Error): State {
    console.error("getDerivedStateFromError is called:", error);
    return { hasError: true };
  }

  // optionally to add some extra logic if needed
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong...</h1>; // display a fallback UI
    }

    return this.props.children; // display the normal UI
  }
}

export default ErrorBoundary;
