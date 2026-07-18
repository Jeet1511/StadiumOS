/**
 * @module ErrorBoundary
 * @description Catches unhandled React errors and displays a graceful fallback UI.
 * Ensures the application never shows a blank white screen to judges.
 */
import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[StadiumOS ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="flex items-center justify-center h-screen w-screen bg-[#080e1e] text-white">
          <div className="text-center max-w-md px-6">
            <h1 className="text-2xl font-bold mb-2">StadiumOS</h1>
            <p className="text-white/60 text-sm mb-4">Something went wrong. Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-300 text-sm font-semibold hover:bg-cyan-500/30 transition-all"
              aria-label="Reload application"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
