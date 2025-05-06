import { redirect } from '@tanstack/react-router';
import { authCookies } from './authCookies';

export const requireAuth = (
  redirectTo?: string,
  searchParams?: URLSearchParams
) => {
  const token = authCookies.getAccessToken();
  if (!token) {
    const from = redirectTo || '/';
    const existingSearchParams: Record<string, string> = {};

    // Convert existing search params to an object
    if (searchParams) {
      searchParams.forEach((value, key) => {
        existingSearchParams[key] = value;
      });
    }

    throw redirect({
      to: '/login',
      search: {
        from,
        ...existingSearchParams,
      },
    });
  }
  return;
};

export const requireToDontBeAuth = () => {
  const token = authCookies.getAccessToken();
  if (token) {
    throw redirect({
      to: '/',
    });
  }
  return;
};

export const createProtectedRoute = (routeConfig: any) => {
  return {
    ...routeConfig,
    beforeLoad: ({
      location,
    }: {
      location: { pathname: string; search: string };
    }) => {
      const searchParams = new URLSearchParams(location.search);
      return requireAuth(location.pathname, searchParams);
    },
  };
};

export const createDontAuthRoute = (routeConfig: any) => {
  return {
    ...routeConfig,
    beforeLoad: () => requireToDontBeAuth(),
  };
};
