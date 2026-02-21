import { OwnerSidebar } from "@/components/layout/OwnerSidebar";

export default function OwnerLayout({ children }) {
    return (
        <div className="flex bg-slate-50 min-h-[calc(100vh-80px)]">
            <OwnerSidebar />
            <div className="w-full md:ml-64 p-8">
                {children}
            </div>
        </div>
    );
}
