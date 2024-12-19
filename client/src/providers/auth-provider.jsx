import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const initialState = {
  user: null,
  setUser: () => null,
  loading: true,
  logout: () => null,
};

export const AuthContext = createContext(initialState);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function logout() {
    Cookies.remove("authtoken");
  }

  useEffect(() => {
    async function fetchUser() {
      const backendUrl = import.meta.env.VITE_PUBLIC_BACKEND_URL;
      const token = Cookies.get("authtoken");

      if (token) {
        try {
          const { data } = await axios.get(`${backendUrl}/api/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(data);
        } catch (error) {
          if (token) {
            Cookies.remove("authtoken");
          }
          setUser(null);
        }
      }
      setLoading(false);
    }

    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
