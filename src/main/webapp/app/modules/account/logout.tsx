import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/config/store';
import { logout } from 'app/shared/auth/auth.reducer';
import { Spin } from 'antd';

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Clear tokens from storage
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('jhi-authenticationToken');

        // Dispatch logout action
        await dispatch(logout());

        // Navigate to login page
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
        // Even if there's an error, navigate to login
        navigate('/login');
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Spin size="large" />
      <div style={{ fontSize: '16px', color: '#666' }}>Logging out...</div>
    </div>
  );
};

export default Logout;
