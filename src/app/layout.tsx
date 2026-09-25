import type { Metadata } from "next";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { PlanProvider } from "@/context/PlanContext";
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
          <PlanProvider>{children}</PlanProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
