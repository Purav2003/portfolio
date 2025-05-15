import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/ui/theme-provider";
import App from "./App";
import "./index.css";
import { initAnimations } from "./lib/animation";

// Initialize animations
initAnimations();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <ThemeProvider defaultTheme="system" storageKey="payal-theme">
      <App />
    </ThemeProvider>
  );
} else {
  console.error("Root element not found");
}
