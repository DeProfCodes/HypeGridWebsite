import axios from 'axios';
import { env } from '@/app/config/env';

// Public website HTTP client. The website talks only to anonymous public
// endpoints, so there is no auth header / refresh logic here (the admin app
// has the authenticated variant). Base URL is env-driven.
export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

if (env.enableApiLogging) {
  httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      // Public GETs fall back to mock content in the store layer; log for dev.
      console.warn('[HypeGrid API]', error?.config?.url, error?.message);
      return Promise.reject(error);
    }
  );
}
