import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = ({ children, admin }) => {
  const { isUserLogin, user } = useAppSelector((state) => state.auth);

  if (!isUserLogin) return <Navigate to="/auth" />;
  if (admin && !user.is_superuser )
    return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
