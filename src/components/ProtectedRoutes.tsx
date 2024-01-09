import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../redux/store";
import Layout from "./Layout";

interface IProtectedRoute {
  children: ReactNode | ReactNode[];
}

const ProtectedRoute: React.FC<IProtectedRoute> = ({ children }) => {
  const isAuthenticated = useSelector<RootState>(
    (state) => state.user.isAuthenticated
  );
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
