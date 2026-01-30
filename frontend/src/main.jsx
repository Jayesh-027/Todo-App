import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div style={{
      minHeight: "100vh",
      background: "#eef2ff",
      fontFamily: "Arial, sans-serif",
      display: "center",
      
  }}>
  <App />
</div>

  </BrowserRouter>
);
