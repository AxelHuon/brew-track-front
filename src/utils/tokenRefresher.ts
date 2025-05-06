// utils/auth.ts
import type { AuthLoginResponseDTO } from '@/api/generated/Api.schemas';
import { postRefresh } from '@/api/generated/auth';
import type { AccessTokenTypes } from '@/types/accessToken';
import { jwtDecode } from 'jwt-decode';
import { authCookies } from './authCookies';

export const setAuthTokens = (
  authResponse: AuthLoginResponseDTO
): AccessTokenTypes => {
  // Stockage des tokens
  authCookies.setAccessToken(authResponse.accessToken);
  authCookies.setRefreshToken(authResponse.refreshToken);

  return jwtDecode<AccessTokenTypes>(authResponse.accessToken);
};

export const refreshTokens = async (): Promise<boolean> => {
  const refreshToken = authCookies.getRefreshToken();
  if (!refreshToken) {
    return false;
  }
  try {
    const response = await postRefresh({ refreshToken: refreshToken });
    console.log(response);
    return true;
  } catch (error) {
    return false;
  }
};
