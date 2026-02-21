"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle, AlertTriangle, Crown, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubscriptionPage() {
    const { user, login } = useAuth(); // We'll use login to update user state mock
    const router = useRouter();
    const [loading, setLoading] = useState(null);

    const plans = [
        {
            name: "Basic Plan",
            price: "₹499",
            period: "/ month",
            buses: 2,
            features: ["Up to 2 Buses", "Standard Listing", "Email Support"],
            id: "basic",
            color: "bg-blue-500"
        },
        {
            name: "Standard Plan",
            price: "₹999",
            period: "/ month",
            buses: 5,
            features: ["Up to 5 Buses", "Priority Listing", "Direct Customer Contact", "24/7 Support"],
            id: "standard",
            popular: true,
            color: "bg-purple-600"
        },
        {
            name: "Premium Plan",
            price: "₹1999",
            period: "/ month",
            buses: 10,
            features: ["Up to 10 Buses", "Top Search Results", "Dedicated Manager", "Analytics Dashboard"],
            id: "premium",
            color: "bg-orange-500"
        }
    ];

    const handleUpgrade = (plan) => {
        setLoading(plan.id);
        setTimeout(() => {
            // Mock Upgrade Logic
            const updatedUser = { ...user };
            updatedUser.subscription.plan = plan.name;
            updatedUser.subscription.limit = plan.buses;

            login('owner', updatedUser); // Update context
            setLoading(null);
            alert(`Successfully upgraded to ${plan.name}!`);
            router.push("/owner/dashboard");
        }, 1500);
    }

    // Current Plan Helper
    const isCurrent = (planName) => user?.subscription?.plan === planName;

    return (
        <div className="bg-slate-50 min-h-screen p-8">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Upgrade Your Business</h1>
                    <p className="text-slate-500">Choose a plan that fits your fleet size and growth goals.</p>
                </div>

                {/* Current Status Banner */}
                <Card className="p-6 bg-white border-l-4 border-l-primary flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Current Plan</p>
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            {user?.subscription?.plan || "Free Trial"}
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">Active</span>
                        </h2>
                        <p className="text-sm text-slate-600 mt-1">Bus Limit: <strong>{user?.subscription?.limit} Buses</strong> • Active: {user?.subscription?.activeBuses}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-slate-500">Expires on</p>
                        <p className="font-medium text-slate-900">{new Date(user?.subscription?.expiry || Date.now()).toLocaleDateString()}</p>
                    </div>
                </Card>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div key={plan.id} className={`relative bg-white rounded-2xl shadow-sm border ${plan.popular ? 'border-primary ring-2 ring-primary/10 shadow-xl scale-105 z-10' : 'border-slate-200'}`}>

                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    Most Popular
                                </div>
                            )}

                            <div className="p-8">
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                                    <span className="text-slate-500 text-sm font-medium">{plan.period}</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={isCurrent(plan.name) ? "outline" : plan.popular ? "primary" : "outline"}
                                    className="w-full"
                                    disabled={isCurrent(plan.name) || loading}
                                    onClick={() => handleUpgrade(plan)}
                                >
                                    {loading === plan.id ? "Processing..." : isCurrent(plan.name) ? "Current Plan" : "Upgrade Now"}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12 text-slate-400 text-sm flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Secure Payment • Cancel Anytime • Money Back Guarantee
                </div>

            </div>
        </div>
    );
}
