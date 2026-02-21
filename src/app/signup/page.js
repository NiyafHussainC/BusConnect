"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { User, Bus, Upload, CheckCircle, Info } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function Signup() {
    const [role, setRole] = useState("customer"); // 'customer' or 'owner'
    const [loading, setLoading] = useState(false);
    const [successState, setSuccessState] = useState(null); // null | 'customer_success' | 'owner_pending'

    const router = useRouter();
    const searchParams = useSearchParams();
    const { signup } = useAuth();

    // Handle Role Pre-selection from URL
    useEffect(() => {
        const roleParam = searchParams.get('role');
        if (roleParam === 'owner' || roleParam === 'customer') {
            setRole(roleParam);
        }
    }, [searchParams]);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        company: "", // Owner only
        city: "", // Owner only
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        setLoading(true);

        const userData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: role,
            ...(role === 'owner' ? {
                company: formData.company,
                city: formData.city,
            } : {})
        };

        // Simulate API delay
        setTimeout(() => {
            const result = signup(userData);
            setLoading(false);

            if (result.success) {
                if (role === 'customer') {
                    setSuccessState('customer_success');
                    // Auto-redirect for customer after delay
                    setTimeout(() => router.push('/login/customer'), 3000);
                } else {
                    setSuccessState('owner_pending');
                    // Auto-redirect to home or login after longer delay
                    setTimeout(() => router.push('/'), 5000);
                }
            } else {
                alert(result.message);
            }
        }, 1500);
    };

    if (successState === 'customer_success') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 text-center animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Created!</h2>
                    <p className="text-slate-600 mb-6">
                        Your customer account has been created successfully. <br />
                        Redirecting you to login...
                    </p>
                    <Button variant="primary" onClick={() => router.push('/login/customer')}>
                        Login Now
                    </Button>
                </Card>
            </div>
        );
    }

    if (successState === 'owner_pending') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 text-center animate-in zoom-in duration-300 border-t-4 border-t-yellow-400">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Info className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Verification Pending</h2>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                        Your partner account has been created successfully. <br /><br />
                        <strong>It is currently under admin verification.</strong><br />
                        You will be notified or able to login once your account is approved.
                    </p>
                    <Button variant="outline" onClick={() => router.push('/')}>
                        Return to Home
                    </Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Card className="max-w-xl w-full p-8 border-t-4 border-t-primary shadow-xl">

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Create an Account</h1>
                    <p className="text-slate-500">Join BusConnect to start your journey.</p>
                </div>

                {/* Role Selection */}
                <div className="flex gap-4 mb-8 bg-slate-100 p-1.5 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setRole('customer')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${role === 'customer' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <User className="w-4 h-4" /> Register as User
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('owner')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${role === 'owner' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Bus className="w-4 h-4" /> Register as Agency
                    </button>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">

                    {/* Common Fields */}
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <Input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <Input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number</label>
                            <Input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 98765 43210" required />
                        </div>
                    </div>

                    {/* Owner Only Fields */}
                    {role === 'owner' && (
                        <div className="space-y-4 pt-4 border-t border-slate-100 animate-in slide-in-from-top-2 fade-in duration-300">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Business / Fleet Name</label>
                                <Input name="company" value={formData.company} onChange={handleChange} placeholder="Royal Travels" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Operating City</label>
                                    <Input name="city" value={formData.city} onChange={handleChange} placeholder="Bangalore" required />
                                </div>
                                <div className="flex items-end">
                                    <div className="border-2 border-dashed border-slate-200 rounded-lg p-2 w-full flex items-center justify-center text-slate-400 cursor-not-allowed bg-slate-50 h-[42px]">
                                        <span className="text-xs">Docs Optional</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <Input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="••••••••" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                            <Input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" placeholder="••••••••" required />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                            {loading ? "Creating Account..." : (role === 'customer' ? "Create User Account" : "Submit for Verification")}
                        </Button>
                    </div>

                    <p className="text-center text-sm text-slate-500 mt-4">
                        Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Login here</Link>
                    </p>

                </form>
            </Card>
        </div>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Signup />
        </Suspense>
    );
}
