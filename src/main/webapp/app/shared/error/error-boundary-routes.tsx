import React from 'react';
import { Routes } from 'react-router-dom';
import ErrorBoundary from './error-boundary';

interface ErrorBoundaryRoutesProps {
  children: React.ReactNode;
}

const ErrorBoundaryRoutes: React.FC<ErrorBoundaryRoutesProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <Routes>{children}</Routes>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryRoutes;
