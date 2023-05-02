import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <div id="particles-js"></div>
    <script src="particles.js"></script>
    <script src="app.js"></script>
  </React.StrictMode>
);
