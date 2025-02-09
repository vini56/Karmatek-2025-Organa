"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import Loading from "./Loading";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  // if (!mounted) return <Loading />;
  return (
    <div className="transition duration-1000 ease-in-out">
      {mounted ? (
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default Provider;
