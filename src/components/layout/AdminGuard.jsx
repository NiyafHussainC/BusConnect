"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export function AdminGuard({ children }) {
    const { user, isAuthLoaded } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (!isAuthLoaded) return;

        if (!isLoginPage && (!user || user.role !== 'admin')) {
            router.push("/admin/login");
        }

        if (isLoginPage && user?.role === 'admin') {
            router.push("/admin/approvals");
        }
    }, [user, isAuthLoaded, router, isLoginPage]);

    if (!isAuthLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    // Hide protected content while redirecting to login
    if (!isLoginPage && (!user || user.role !== 'admin')) {
        return null;
    }

    return children;
}
