"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#1E293B",
            color: "#F1F5F9",
            fontSize: "14px",
            borderRadius: "10px",
            padding: "12px 16px",
          },
        }}
      />
    </>
  );
}