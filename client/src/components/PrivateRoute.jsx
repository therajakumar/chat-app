import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "@/hooks/use-auth";
const PrivateRouter = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Spinner />;
  }
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
