// src/utils/cookies.ts
import Cookies from 'js-cookie';

// Constantes pour les noms de cookies
export const ACCESS_TOKEN_KEY = 'brew_track_access_token';
export const REFRESH_TOKEN_KEY = 'brew_track_refresh_token';

// Durée de vie du cookie d'accès: 1 heure (exprimée en jours pour js-cookie)
const ACCESS_TOKEN_EXPIRY = 1 / 24;
// Durée de vie du cookie de rafraîchissement: 30 jours
const REFRESH_TOKEN_EXPIRY = 30;

export const authCookies = {
  setAccessToken: (token: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, token, {
      expires: ACCESS_TOKEN_EXPIRY,
      secure: import.meta.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  },

  setRefreshToken: (token: string) => {
    Cookies.set(REFRESH_TOKEN_KEY, token, {
      expires: REFRESH_TOKEN_EXPIRY,
      secure: import.meta.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  },

  getAccessToken: () => Cookies.get(ACCESS_TOKEN_KEY),

  getRefreshToken: () => Cookies.get(REFRESH_TOKEN_KEY),

  clearTokens: () => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
  },
};
