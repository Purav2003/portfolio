import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { cn } from "../lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen flex flex-col no-overflow-container", className)}>
      <Header />
      <main className="flex-grow overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
