"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Map,
    Clock,
    Gift,
    Settings,
    User,
    ChevronLeft,
    ChevronRight,
    Menu
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function UserSidebar({ isCollapsed, toggleSidebar }) {
    const pathname = usePathname();
    const { user } = useAuth();

    const isActive = (path) => pathname === path;

    const navItems = [
        {
            name: "Plan Trip",
            href: "/dashboard/user",
            icon: Map
        },
        {
            name: "My Requests",
            href: "/dashboard/user/requests",
            icon: Clock
        },
        {
            name: "Rewards",
            href: "/dashboard/user/rewards",
            icon: Gift
        },
        {
            name: "Settings",
            href: "/dashboard/user/settings",
            icon: Settings
        }
    ];

    return (
        <aside
            className={`bg-slate-900 text-white min-h-screen fixed left-0 top-0 z-50 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Header */}
            <div className={`p-6 border-b border-slate-800 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
                {!isCollapsed && (
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                                BusConnect
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">User Panel</p>
                    </div>
                )}

                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white transition-colors"
                >
                    {isCollapsed ? <LayoutDashboard className="w-6 h-6 rotate-180" /> : <LayoutDashboard className="w-5 h-5" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        title={isCollapsed ? item.name : ""}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive(item.href)
                            ? "bg-orange-600 text-white shadow-lg shadow-orange-900/20"
                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                            } ${isCollapsed ? "justify-center" : ""}`}
                    >
                        <item.icon className={`w-5 h-5 shrink-0 ${isActive(item.href) ? "text-white" : "text-slate-500 group-hover:text-white"
                            }`} />
                        {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
                    </Link>
                ))}
            </nav>

            {/* User Profile & Logout */}
            <div className="p-4 border-t border-slate-800">
                <div className={`bg-slate-800 rounded-lg p-3 mb-3 flex items-center ${isCollapsed ? "justify-center" : "gap-3"}`}>
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-orange-600" />
                    </div>
                    {!isCollapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
                            <p className="text-xs text-slate-400 truncate">{user?.email || "user@example.com"}</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
