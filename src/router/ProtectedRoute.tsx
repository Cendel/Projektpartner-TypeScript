import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  admin?: boolean;
}

const ProtectedRoute = ({ children, admin }: Props) => {
  const { isUserLogin, user } = useAppSelector((state) => state.auth);

  if (!isUserLogin || !user) return <Navigate to="/auth" />;
  if (admin && !user.is_superuser) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
