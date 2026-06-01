import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useCallback } from "react";

export function useAuth() {
  const { identity, loginStatus, login, clear } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && identity !== undefined;
  const isLoading = loginStatus === "logging-in";

  const handleLogin = useCallback(() => {
    login();
  }, [login]);

  const handleLogout = useCallback(() => {
    clear();
  }, [clear]);

  return {
    identity,
    isAuthenticated,
    isLoading,
    loginStatus,
    login: handleLogin,
    logout: handleLogout,
    principal: identity?.getPrincipal(),
  };
}
