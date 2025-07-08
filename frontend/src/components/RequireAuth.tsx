import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: JSX.Element;
  loginPath?: string;
}

export function RequireAuth({
  children,
  loginPath = "/login",
}: RequireAuthProps) {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return children;
}
