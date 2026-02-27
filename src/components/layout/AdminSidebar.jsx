"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { LayoutDashboard, Users, CheckCircle, CreditCard, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AdminSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const links = [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/approvals", label: "Approvals", icon: CheckCircle },
        { href: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
        { href: "/admin/settings", label: "Settings", icon: Settings },
    ];

    return (
        <aside className="fixed left-0 top-20 bottom-0 w-64 bg-slate-900 text-white overflow-y-auto z-40 hidden md:block">
            <div className="p-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Admin</div>
                <nav className="space-y-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors font-medium text-sm",
                                    isActive
                                        ? "bg-primary-foreground/10 text-white"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="absolute bottom-0 w-full p-6 border-t border-white/10">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium w-full"
                >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
