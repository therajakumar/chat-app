import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider.jsx";
import { Toaster } from "sonner";
import AuthProvider from "./providers/auth-provider.jsx";
import SocketProvider from "./providers/socket-provider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SocketProvider>
        <ThemeProvider>
          <App />
          <Toaster
            richColors
            duration={2000}
            closeButton
            position="top-center"
          />
        </ThemeProvider>
      </SocketProvider>
    </AuthProvider>
  </React.StrictMode>
);
