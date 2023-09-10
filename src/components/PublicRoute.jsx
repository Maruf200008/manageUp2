import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const PublicRoute = ({ children }) => {
  const isLoading = useAuth();
  return !isLoading ? children : <Navigate to="/task" />;
};
