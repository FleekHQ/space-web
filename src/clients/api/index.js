import ApiClient from './client';

// process.env.SPACE_SERVICES_URL is specially for local development
const baseURL = process.env.REACT_APP_SPACE_SERVICES_URL || 'https://api-dev.space.storage';

const apiClient = new ApiClient({
  baseURL,
  timeout: 15000,
});

export default apiClient;
