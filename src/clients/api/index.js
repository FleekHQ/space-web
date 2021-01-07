import ApiClient from './client';

// process.env.SPACE_SERVICES_URL is specially for local development
const baseURL = process.env.SPACE_SERVICES_URL || 'https://api-dev.space.storage';
// eslint-disable-next-line no-console
console.log(`Init ApiClient, URL: ${baseURL}`);

const apiClient = new ApiClient({
  baseURL,
  timeout: 15000,
});

export default apiClient;