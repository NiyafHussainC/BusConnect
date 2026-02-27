"use client";

import { Card } from "@/components/ui/Card";
import { Copy, Gift, Info, ShieldCheck, Ticket, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function RewardsPage() {
    const { user } = useAuth();
    const credits = user?.credits || 0;
    const coupons = user?.coupons || [];
    const activeCoupons = coupons.filter(c => !c.used);
    const usedCoupons = coupons.filter(c => c.used);

    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">My Rewards</h1>
                <p className="text-slate-500">Complete trips to earn credits and unlock exclusive discounts.</p>
            </div>

            {/* Credit Progress */}
            <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-white">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 mb-1">Current Credits</h2>
                                <p className="text-sm text-slate-500">Earn 2 credits per completed trip.</p>
                            </div>
                            <div className="text-3xl font-black text-orange-600">
                                {credits}<span className="text-lg text-slate-400 font-medium">/10</span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden mb-3">
                            <div
                                className="h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${(credits / 10) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-xs text-slate-500 font-medium text-right">
                            {10 - credits} more credits to unlock a 10% discount!
                        </p>
                    </div>

                    <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center shrink-0 border-4 border-white shadow-md">
                        <Gift className="w-10 h-10 text-orange-600" />
                    </div>
                </div>
            </Card>

            {/* Info Snippet */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-800">
                <Info className="w-5 h-5 shrink-0 mt-0.5" />
                <p>
                    <strong>How it works:</strong> Book a bus, enjoy your trip, and mark the trip as "Completed" in your requests dashboard to earn 2 credits. Every 10 credits automatically converts into a 10% off coupon for your next adventure!
                </p>
            </div>

            {/* Coupons Section */}
            <div className="space-y-4 pt-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-indigo-600" /> Available Coupons
                </h2>

                {activeCoupons.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-xl">
                        <p className="text-slate-500">You don't have any active coupons right now.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeCoupons.map((coupon, idx) => (
                            <div key={idx} className="bg-white border-2 border-indigo-100 rounded-xl p-0 overflow-hidden shadow-sm flex relative">
                                {/* Left stub */}
                                <div className="bg-indigo-600 text-white p-6 flex flex-col justify-center items-center w-32 border-r-2 border-dashed border-indigo-300 relative">
                                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-slate-50 rounded-full"></div>
                                    <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-slate-50 rounded-full"></div>
                                    <span className="text-3xl font-black">{coupon.discount}%</span>
                                    <span className="text-indigo-200 text-sm font-medium uppercase tracking-wider">OFF</span>
                                </div>
                                {/* Right info */}
                                <div className="p-5 flex-1 flex flex-col justify-center relative bg-indigo-50/30">
                                    <h3 className="font-bold text-slate-900 mb-1">BusConnect Reward</h3>
                                    <p className="text-xs text-slate-500 mb-4">Valid on your next bus booking advance payment.</p>

                                    <div className="flex items-center gap-2">
                                        <code className="bg-slate-200 text-slate-800 px-3 py-1.5 rounded text-sm font-bold tracking-wider">
                                            {coupon.code}
                                        </code>
                                        <button
                                            onClick={() => handleCopy(coupon.code)}
                                            className="text-indigo-600 hover:bg-indigo-100 p-1.5 rounded transition-colors"
                                            title="Copy Code"
                                        >
                                            {copiedCode === coupon.code ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Used Coupons Log */}
            {usedCoupons.length > 0 && (
                <div className="pt-8 space-y-4">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Used Coupons</h3>
                    <div className="space-y-2">
                        {usedCoupons.map((coupon, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm text-slate-500 blur-[0.5px] opacity-75">
                                <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-400" /> {coupon.code}</span>
                                <span className="font-medium">{coupon.discount}% Applied</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
