import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Chatpage from "./pages/Chatpage";
import PublicRoute from "./components/PublicRoute";
import PrivateRouter from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Message from "./pages/Message";
import Page404 from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              {/* It provides protection to / and /register */}
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/" element={<PrivateRouter />}>
          <Route path="/chats" element={<Chatpage />} />
          <Route path="/chats/:chatId" element={<Message />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
