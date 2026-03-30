"use client";

import { useTheme } from "next-themes@0.4.6";
import { Toaster as Sonner, ToasterProps } from "sonner@2.0.3";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        style: {
          background: '#1a1a1a',
          color: '#ffffff',
          border: '1px solid #333333',
        },
        classNames: {
          success: 'toast-success',
          error: 'toast-error',
          info: 'toast-info',
          warning: 'toast-warning',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
