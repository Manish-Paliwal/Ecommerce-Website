import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { StoreProvider } from "./context/Store";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StoreProvider>
    <App />
  </StoreProvider>
);
