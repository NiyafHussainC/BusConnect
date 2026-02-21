"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomerRegister() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push("/login/customer");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md w-full p-8 space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                        Create Customer Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <Link href="/login/customer" className="font-medium text-primary hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            required
                            placeholder="John Doe"
                        />
                        <Input
                            label="Email address"
                            type="email"
                            required
                            placeholder="you@example.com"
                        />
                        <Input
                            label="Phone Number"
                            type="tel"
                            required
                            placeholder="+91 98765 43210"
                        />
                        <Input
                            label="Password"
                            type="password"
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
