import type {AuthLoginGoogleRequestDTO, AuthLoginRequestDTO, UserDTO,} from '@/api/generated/Api.schemas';

import {usePostGoogleAuth, usePostLogin, usePostLogout,} from '@/api/generated/auth';
import type {AccessTokenTypes} from '@/types/accessToken';
import {authCookies} from '@/utils/authCookies';
import {refreshTokens, setAuthTokens} from '@/utils/tokenRefresher';
import {useNavigate} from '@tanstack/react-router';
import {jwtDecode} from 'jwt-decode';
import React, {createContext, useContext, useEffect, useState} from 'react';

/**
 * Interface defining the shape of the authentication context
 */
interface AuthContextType {
  /** The currently authenticated user or null if not authenticated */
  user: UserDTO | null;
  /** Whether a user is currently authenticated */
  isAuthenticated: boolean;
  /** Whether an authentication operation is in progress */
  isLoading: boolean;
  /** Whether the last authentication operation resulted in an error */
  isError: boolean;
  /** Function to log in with email/password credentials */
  login: (
    credentials: AuthLoginRequestDTO,
    from: string | null
  ) => Promise<void>;
  /** Function to log in with Google OAuth */
  googleLogin: (
    credentials: AuthLoginGoogleRequestDTO,
    from: string | null
  ) => Promise<void>;
  /** Function to log out the current user */
  logout: () => Promise<void>;
  loginErrorMessage: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isError: false,
  isLoading: false,
  login: async () => {},
  googleLogin: async () => {},
  logout: async () => {},
  loginErrorMessage: null,
});

/**
 * Props for the AuthProvider component
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that wraps your app and makes auth object available to any
 * child component that calls useAuth().
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(
    null
  );

  const {
    mutateAsync: loginAsync,
    isPending: isLoginLoading,
    isError: isLoginError,
  } = usePostLogin();

  const {
    mutateAsync: googleLoginAsync,
    isPending: isGoogleLoginLoading,
    isError: isGoogleLoginError,
  } = usePostGoogleAuth();

  const {
    mutateAsync: logoutAsync,
    isPending: isLogoutLoading,
    isError: isLogoutError,
  } = usePostLogout();

  /**
   * Authenticates user with email and password
   * @param credentials User login credentials
   */
  const login = async (
    credentials: AuthLoginRequestDTO,
    from: string | null
  ) => {
    try {
      const response = await loginAsync({ data: credentials });
      const userData = setAuthTokens(response);
      setUser(userData);
      setLoginErrorMessage(null);
      if (from) {
        await navigate({ to: from });
      } else {
        await navigate({ to: '/dashboard' });
      }
    } catch (error) {
      if (
        error instanceof Error &&
        (error as any).response?.data?.message === 'Incorrect email or password'
      ) {
        setLoginErrorMessage(
          "Le mot de passe ou l'adresse email est incorrect"
        );
      }
    }
  };

  /**
   * Authenticates user with Google OAuth
   * @param credentials Google OAuth credentials
   */
  const googleLogin = async (
    credentials: AuthLoginGoogleRequestDTO,
    from: string | null
  ) => {
    if (credentials.code === '') {
      throw new Error('Token Google manquant');
    }
    try {
      const response = await googleLoginAsync({ data: credentials });
      const userData = setAuthTokens(response);
      setUser(userData);
      if (from) {
        navigate({ to: from });
      } else {
        navigate({ to: '/dashboard' });
      }
    } catch (error) {
      console.error('Erreur de connexion Google:', error);
      throw error;
    }
  };

  /**
   * Logs out the current user
   */
  const logout = async () => {
    try {
      await logoutAsync();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      authCookies.clearTokens();
      setUser(null);
      navigate({ to: '/login' });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = authCookies.getAccessToken();

      if (accessToken) {
        const userData = jwtDecode<AccessTokenTypes>(accessToken);
        setUser(userData);
      } else {
        const refreshSuccessful = await refreshTokens();
        if (refreshSuccessful) {
          const newAccessToken = authCookies.getAccessToken();
          if (newAccessToken) {
            const userData = jwtDecode<AccessTokenTypes>(newAccessToken);
            setUser(userData);
          }
        }
      }
    };

    checkAuth();
  }, []);

  const contextValue: AuthContextType = {
    user,
    loginErrorMessage,
    login,
    isAuthenticated: !!user,
    isLoading: isLoginLoading || isGoogleLoginLoading || isLogoutLoading,
    isError: isLoginError || isGoogleLoginError || isLogoutError,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Hook to access the auth context
 * @returns The auth context value
 */
export const useAuth = () => useContext(AuthContext);
