import { Navigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuth } from "@/hooks/use-auth";
import PropTypes from "prop-types";

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function PublicRoute({ children }) {
  const { loading, user } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return user ? <Navigate to="/chats" /> : children;
}
