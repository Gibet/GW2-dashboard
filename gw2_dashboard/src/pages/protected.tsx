import { Navigate, Outlet } from "react-router";
import { useAccount } from "../contexts/accountContext";

const ProtectedRoute = () => {
  const account = useAccount();

  if (!account?.data) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;