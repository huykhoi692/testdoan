import axios from 'axios';
import { Storage } from 'react-jhipster';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;
axios.defaults.withCredentials = true;

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    // Don't add token to /authenticate and /register endpoints
    const isAuthEndpoint = config.url && (config.url.includes('/api/authenticate') || config.url.includes('/api/register'));

    if (!isAuthEndpoint) {
      // Check multiple token storage locations for compatibility
      const token =
        Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken') || localStorage.getItem('authToken'); // Also check authToken from login page
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = err => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err instanceof Error ? err : new Error(err));
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
  // Dev-only: fallback for network errors so frontend can run without backend
  if (process.env.NODE_ENV !== 'production') {
    axios.interceptors.response.use(undefined, error => {
      // If there's already a response error, delegate to existing handler
      if (error && error.response) {
        return Promise.reject(error instanceof Error ? error : new Error(error));
      }
      // Network error (no response) - return a safe fake response to prevent unhandled rejections
      // For GET requests return empty array, for others return null
      const cfg = error.config || {};
      const method = (cfg.method || 'get').toLowerCase();
      const fallbackData = method === 'get' ? [] : null;
      const fakeResponse = {
        data: fallbackData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: cfg,
      };
      console.warn('Axios dev fallback applied for network error:', error && error.message ? error.message : error);
      return Promise.resolve(fakeResponse);
    });
  }
};

export default setupAxiosInterceptors;
