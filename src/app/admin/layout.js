import { AdminSidebar } from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex bg-slate-50 min-h-[calc(100vh-80px)]">
            <AdminSidebar />
            <div className="w-full md:ml-64 p-8">
                {children}
            </div>
        </div>
    );
}
