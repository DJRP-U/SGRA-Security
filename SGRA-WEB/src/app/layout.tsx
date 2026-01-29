import type { Metadata } from "next";
import { Asap } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const raleway = Asap({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SGRA"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-white">
      <body
        className={`${raleway.className} antialiased flex flex-col h-screen`}
      >
        <div className="w-full h-full">
          {children}
        </div>
        <Toaster
          richColors
          position="top-center"
          toastOptions={{
            style: {
              fontSize: "1rem",
              width: "max-content",
              maxWidth: "90vw",
              left: "50%",
              transform: "translateX(-50%)",
            },
          }}
        />
      </body>
    </html>
  );
}