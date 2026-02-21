import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, X, ShieldCheck } from "lucide-react";

export default function Pricing() {
    const plans = [
        {
            name: "Free",
            price: "₹0",
            period: "/month",
            desc: "Perfect for getting started.",
            features: [
                { name: "1 Bus Listing", included: true },
                { name: "Limited Leads", included: true },
                { name: "Direct Contact Info", included: false },
                { name: "Priority Support", included: false },
                { name: "Top Listing Badge", included: false },
            ],
            cta: "Get Started",
            variant: "outline"
        },
        {
            name: "Standard",
            price: "₹999",
            period: "/month",
            desc: "For growing bus operators.",
            features: [
                { name: "Up to 5 Bus Listings", included: true },
                { name: "Unlimited Leads", included: true },
                { name: "Direct Contact Info", included: true },
                { name: "Priority Support", included: false },
                { name: "Top Listing Badge", included: false },
            ],
            cta: "Upgrade",
            variant: "primary",
            popular: true
        },
        {
            name: "Premium",
            price: "₹1999",
            period: "/month",
            desc: "For large fleet owners.",
            features: [
                { name: "Unlimited Bus Listings", included: true },
                { name: "Unlimited Leads", included: true },
                { name: "Direct Contact Info", included: true },
                { name: "Priority Support", included: true },
                { name: "Top Listing Badge", included: true },
            ],
            cta: "Go Premium",
            variant: "accent"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Choose the plan that fits your business needs. No hidden fees. Cancel anytime.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {plans.map((plan, idx) => (
                        <Card
                            key={idx}
                            className={`relative flex flex-col p-8 ${plan.popular ? 'border-primary ring-2 ring-primary ring-offset-2' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                                    POPULAR
                                </div>
                            )}
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                                <span className="text-slate-500">{plan.period}</span>
                            </div>
                            <p className="text-slate-500 mb-8">{plan.desc}</p>

                            <div className="flex-grow space-y-4 mb-8">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-3">
                                        {feature.included ? (
                                            <Check className="w-5 h-5 text-green-500 shrink-0" />
                                        ) : (
                                            <X className="w-5 h-5 text-slate-300 shrink-0" />
                                        )}
                                        <span className={feature.included ? 'text-slate-900' : 'text-slate-400'}>
                                            {feature.name}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Button variant={plan.variant} className="w-full">
                                {plan.cta}
                            </Button>
                        </Card>
                    ))}
                </div>

                {/* Benefits / Secure */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-around gap-8 text-center md:text-left">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">Secure Payments</h4>
                            <p className="text-sm text-slate-500">256-bit SSL Encrypted</p>
                        </div>
                    </div>
                    <div className="h-px w-full md:w-px md:h-12 bg-slate-200"></div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <Check className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">30-Day Money Back</h4>
                            <p className="text-sm text-slate-500">Guaranteed satisfaction</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
