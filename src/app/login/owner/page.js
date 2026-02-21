"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle } from "lucide-react";

export default function OwnerLogin() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        setTimeout(() => {
            const result = login(formData.email, formData.password, 'owner');

            if (!result.success) {
                setError(result.message);
                setLoading(false);
            }
            // If success, router.push happens in context
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full p-8 space-y-8 border-t-4 border-t-orange-500">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                        Bus Operator Login
                    </h2>

                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative flex items-start gap-2 text-sm" role="alert">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <Input
                            label="Email address"
                            type="email"
                            required
                            placeholder="owner@travels.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="accent"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Login"}
                        </Button>
                    </div>

                    <div className="text-center mt-4">
                        <Link href="/signup?role=owner" className="text-sm text-slate-500 hover:text-orange-600 transition-colors">
                            New here? Register your agency
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}
