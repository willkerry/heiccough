import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "sonner";

import App from "./App.tsx";

import "./main.css";
import "inter-ui/inter-variable.css";
import "@fontsource-variable/roboto-mono/wght.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
