"use client";

import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { AdminGuard } from "@/components/layout/AdminGuard";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    return (
        <AdminGuard>
            <div className={`flex bg-slate-50 min-h-[calc(100vh-80px)] ${isLoginPage ? 'items-center justify-center' : ''}`}>
                {!isLoginPage && <AdminSidebar />}
                <div className={`w-full ${!isLoginPage ? 'md:ml-64 p-8' : ''}`}>
                    {children}
                </div>
            </div>
        </AdminGuard>
    );
}
