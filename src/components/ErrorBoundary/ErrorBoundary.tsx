import { Component, ErrorInfo, ReactNode } from 'react';
import Button from '@/components/Button/Button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#080b12',
            color: '#fff',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <AlertTriangle size={64} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            SYSTEM CRITICAL ERROR
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', marginBottom: '2rem' }}>
            An unexpected glitch occurred in the matrix. Don't worry, your high scores remain safe.
          </p>
          <Button variant="primary" onClick={this.handleReset}>
            <RotateCcw size={18} /> REBOOT SYSTEM
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}