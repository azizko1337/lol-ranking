"use client";

import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/ThemeProvider";

function Template({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NavBar />
      <main className="w-300 max-w-5xl mx-auto pb-10">{children}</main>
    </ThemeProvider>
  );
}

export default Template;
