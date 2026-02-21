import MainLayout from "@/components/layout/MainLayout";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "BusConnect - Charter Bus Rentals",
  description: "Book full buses for weddings, tours, and corporate events.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-slate-50 text-slate-900 font-sans`}
      >
        <AuthProvider>
          <ThemeProvider>
            <MainLayout>
              {children}
            </MainLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
