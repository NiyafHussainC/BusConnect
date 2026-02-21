"use client";

import UserSidebar from "@/components/layout/UserSidebar";
import { useState, useEffect } from "react";

export default function UserDashboardLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Load state from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("sidebarCollapsed");
        if (saved) setIsCollapsed(JSON.parse(saved));
    }, []);

    const toggleSidebar = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <UserSidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <main
                className={`min-h-screen transition-all duration-300 ease-in-out ${isCollapsed ? "pl-20" : "pl-64"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
