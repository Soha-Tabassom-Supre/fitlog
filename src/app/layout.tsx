import type { Metadata } from "next";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { PlanProvider } from "@/context/PlanContext";
import { ToastProvider } from "@/context/ToastContext";

export const metadata: Metadata = {
  title: "FitLog",
  description: "Workout tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FavoritesProvider>
          <PlanProvider>
            <ToastProvider>{children}</ToastProvider>
          </PlanProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
