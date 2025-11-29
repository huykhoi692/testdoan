import axios from 'axios';
import { Storage } from 'react-jhipster';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.withCredentials = true;

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    // Public endpoints that don't need authentication
    const publicEndpoints = [
      '/api/authenticate',
      '/api/register',
      '/api/activate',
      '/api/account/reset-password/init',
      '/api/account/reset-password/finish',
      '/api/captcha',
      '/api/auth/',
      '/api/oauth2/',
    ];

    // Check if this is a public endpoint
    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint));

    // Only add token if not a public endpoint
    if (!isPublicEndpoint) {
      const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
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
};

export default setupAxiosInterceptors;
