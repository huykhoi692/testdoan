import React from 'react';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from './shared/error/error-boundary';
import AppRoutes from './routes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className="app-container">
      <ToastContainer position="top-left" className="toastify-container" />
      <ErrorBoundary>
        <React.Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <AppRoutes />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
