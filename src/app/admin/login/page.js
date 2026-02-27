"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth(); // Assuming login function supports 'admin' role

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        const result = login(email, password, 'admin');

        if (result.success) {
            // Router push is handled in login method or we can safely redirect here
            router.push("/admin/approvals");
        } else {
            alert(result.message || "Please enter valid credentials");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-8 bg-white shadow-xl border-t-4 border-t-indigo-600">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                        <ShieldCheck className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Portal</h1>
                    <p className="text-slate-500 text-sm mt-1">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <Input
                            type="email"
                            placeholder="admin@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" variant="primary" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                        {loading ? "Authenticating..." : "Login"}
                    </Button>
                </form>

                <div className="text-center mt-6">
                    <Link href="/login" className="text-sm text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1">
                        <Lock className="w-3 h-3" /> Return to Main Login
                    </Link>
                </div>
            </Card>
        </div>
    );
}
