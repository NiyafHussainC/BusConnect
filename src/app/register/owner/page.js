"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OwnerRegister() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Redirect to Pending Verification page for Owners
            router.push("/owner/pending");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-xl w-full p-8 space-y-8 border-t-4 border-t-orange-500">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                        Partner with BusConnect
                    </h2>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Already a partner?{' '}
                        <Link href="/login/owner" className="font-medium text-orange-600 hover:text-orange-500">
                            Login here
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleRegister}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <Input
                                label="Travel Agency / Company Name"
                                type="text"
                                required
                                placeholder="e.g. Royal Travels"
                            />
                        </div>
                        <div>
                            <Input
                                label="Owner Name"
                                type="text"
                                required
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div>
                            <Input
                                label="Mobile Number"
                                type="tel"
                                required
                                placeholder="+91 98765 43210"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Input
                                label="Email Address"
                                type="email"
                                required
                                placeholder="partners@example.com"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Input
                                label="GST / License Number (Optional)"
                                type="text"
                                placeholder="GSTIN12345678"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Input
                                label="Password"
                                type="password"
                                required
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-slate-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="text-slate-600">
                                I agree to the <a href="#" className="font-medium text-orange-600 hover:text-orange-500">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            variant="accent"
                            className="w-full h-12 text-lg"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Register"}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
