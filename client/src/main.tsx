import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/ui/theme-provider";
import App from "./App";
import "./index.css";
import { initAnimations } from "@/lib/animation";

// Initialize animations
initAnimations();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="payal-theme">
    <App />
  </ThemeProvider>
);
