import { authCookies } from '@/utils/authCookies';
import axios, {
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

export const AXIOS_INSTANCE = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let isRefreshing = false;
let failedRequests: Array<() => void> = [];

AXIOS_INSTANCE.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey) {
      config.headers['x-api-key'] = apiKey;
    }

    const accessToken = authCookies.getAccessToken();
    if (accessToken && !config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  }
);

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response?.data);
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      authCookies.getRefreshToken() &&
      error.response?.data === 'Unauthorized'
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const { refreshTokens } = await import('@/utils/tokenRefresher');
          const refreshSuccessful = await refreshTokens();
          if (refreshSuccessful) {
            // Rejouer les requêtes dans la file d'attente après le refresh
            failedRequests.forEach((req) => req());
            failedRequests = []; // Réinitialiser la file d'attente
            isRefreshing = false;

            // Ajouter à nouveau le token dans la demande originale
            originalRequest.headers['Authorization'] =
              `Bearer ${authCookies.getAccessToken()}`;
            return AXIOS_INSTANCE(originalRequest);
          }
        } catch (refreshError) {
          console.error('Erreur de rafraîchissement:', refreshError);
          isRefreshing = false;
          failedRequests = []; // Nettoyer après un échec
          authCookies.clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        failedRequests.push(() => {
          originalRequest.headers['Authorization'] =
            `Bearer ${authCookies.getAccessToken()}`;
          resolve(AXIOS_INSTANCE(originalRequest));
        });
      });
    }

    if (
      error.response?.status === 401 &&
      error.response?.data === 'Unauthorized'
    ) {
      authCookies.clearTokens();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = axios.CancelToken.source();

  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data) as Promise<T> & { cancel: () => void };

  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

export type BodyType<BodyData> = BodyData;
