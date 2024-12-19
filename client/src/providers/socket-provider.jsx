import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";

const initialState = {
  socket: null,
  connected: false,
};

export const SocketContext = createContext(initialState);

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_PUBLIC_BACKEND_URL);
    socket.on("connect", () => {
      console.log("Connected to server");
      setConnected(true);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      setConnected(false);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  const value = {
    socket,
    connected,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
