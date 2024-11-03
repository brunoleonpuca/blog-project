import React from 'react';
import styled from 'styled-components';
import Button from './button';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
`;

const ErrorTitle = styled.h1`
  color: ${props => props.theme.colors.error};
  margin-bottom: ${props => props.theme.spacing.md};
  font-family: ${props => props.theme.typography.platform.title};
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 500px;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We apologize for the inconvenience. Please try refreshing the page or contact support if the problem persists.
          </ErrorMessage>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;