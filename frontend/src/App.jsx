import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Board from "./pages/Board";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      {/* Login page */}
      <Route path="/" element={<Login />} />

      {/* Boards dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Single board tasks */}
      <Route path="/board/:id" element={<Board />} />

      {/* Register page */}
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
