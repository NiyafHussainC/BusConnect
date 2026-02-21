"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const isUserDashboard = pathname.startsWith("/dashboard/user");

    return (
        <>
            {!isUserDashboard && <Navbar />}
            <main className={`min-h-screen ${!isUserDashboard ? "pt-20" : ""}`}>
                {children}
            </main>
            {!isUserDashboard && <Footer />}
        </>
    );
}
