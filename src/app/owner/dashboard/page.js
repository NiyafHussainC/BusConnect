"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Bus, Calendar, DollarSign, ArrowUpRight, Crown } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OwnerDashboard() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || user.role !== 'owner') {
            // router.push("/login/owner"); 
        }
    }, [user]);

    // Safe checks
    const planName = user?.subscription?.plan || "Free Trial";
    const busLimit = user?.subscription?.limit || 999;
    const activeBuses = user?.subscription?.activeBuses || 2;
    const expiry = user?.subscription?.expiry
        ? new Date(user.subscription.expiry).toLocaleDateString()
        : "30 days";

    // Calculate Usage Percentage
    const usagePercent = Math.min((activeBuses / busLimit) * 100, 100);

    return (
        <div className="space-y-8 bg-slate-50 min-h-screen p-8">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500">Welcome back, {user?.name || "Partner"}</p>
                </div>
                <Link href="/owner/buses/add">
                    <Button variant="primary" className="shadow-lg shadow-primary/20">
                        + Add New Bus
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 border-0 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">₹1.2L</h3>
                        <span className="text-green-600 text-xs font-bold flex items-center gap-1 mt-1">
                            <ArrowUpRight className="w-3 h-3" /> +12% this month
                        </span>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                        <DollarSign className="w-6 h-6" />
                    </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">New Requests</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">18</h3>
                        <span className="text-blue-600 text-xs font-bold mt-1 block">4 pending action</span>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Calendar className="w-6 h-6" />
                    </div>
                </Card>

                <Card className="p-6 border-0 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 text-sm font-medium">Fleet Status</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{activeBuses} / {busLimit > 100 ? '∞' : busLimit}</h3>
                        <span className="text-slate-400 text-xs mt-1 block">Active Buses</span>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                        <Bus className="w-6 h-6" />
                    </div>
                </Card>

                {/* Subscription Card */}
                <Card className="p-0 border-0 shadow-md bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>

                    <div className="p-6 relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                    <Crown className="w-3 h-3 text-yellow-400" /> Current Plan
                                </p>
                                <h3 className="text-xl font-bold text-white mt-1">{planName}</h3>
                            </div>
                            <Link href="/owner/subscription">
                                <button className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full font-medium transition-colors border border-white/10">
                                    Upgrade
                                </button>
                            </Link>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs text-slate-400">
                                <span>Usage</span>
                                <span>{activeBuses} of {busLimit > 100 ? 'Unlimited' : busLimit} buses</span>
                            </div>
                            {/* Progress Bar */}
                            <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
                                    style={{ width: `${usagePercent}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-slate-500 mt-2 text-right">Expires: {expiry}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Active Requests Table */}
            <Card className="p-0 overflow-hidden shadow-md">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">Trip Requests</h3>
                        <p className="text-slate-500 text-sm">Manage incoming inquiries and send quotes.</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">
                            2 Pending
                        </span>
                        <span className="text-xs bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium border border-orange-100">
                            1 Quoted
                        </span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600 font-medium">
                            <tr>
                                <th className="p-4 pl-6">Trip ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Route & Date</th>
                                <th className="p-4">Pax</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right pr-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {[
                                {
                                    id: "TRIP-1024",
                                    customer: "Amit Kumar",
                                    route: "Bangalore ➝ Mysore",
                                    date: "10 Feb 2024",
                                    type: "Round Trip",
                                    pax: 12,
                                    quote: null,
                                    status: "Pending"
                                },
                                {
                                    id: "TRIP-1025",
                                    customer: "Sara Jones",
                                    route: "Bangalore ➝ Coorg",
                                    date: "14 Feb 2024",
                                    type: "One Way",
                                    pax: 18,
                                    quote: "₹18,500",
                                    status: "Quoted"
                                },
                                {
                                    id: "TRIP-1026",
                                    customer: "Rahul Dravid",
                                    route: "Bangalore ➝ Mysore",
                                    date: "10 Feb 2024", // Conflict with 1024
                                    type: "Round Trip",
                                    pax: 15,
                                    quote: null,
                                    status: "Pending",
                                    conflict: true
                                }
                            ].map((req, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4 pl-6 font-mono text-slate-500">#{req.id.split('-')[1]}</td>
                                    <td className="p-4 font-medium text-slate-900">
                                        {req.customer}
                                        <div className="text-xs text-slate-400 font-normal">+91 98XXX XXXXX</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-slate-800">{req.route}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                                            <Calendar className="w-3 h-3" /> {req.date} • {req.type}
                                            {req.conflict && (
                                                <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded flex items-center gap-1 font-bold">
                                                    ! Date Conflict
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4 text-slate-600">{req.pax} Pax</td>
                                    <td className="p-4">
                                        {req.quote ? (
                                            <span className="font-bold text-slate-900">{req.quote}</span>
                                        ) : (
                                            <span className="text-slate-400 italic text-xs">Not quoted</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${req.status === 'Pending' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                req.status === 'Quoted' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                                    'bg-green-50 text-green-700 border-green-100'
                                            }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        {req.status === 'Pending' && (
                                            <Button variant="accent" size="sm" className="h-8 text-xs">
                                                Send Quote
                                            </Button>
                                        )}
                                        {req.status === 'Quoted' && (
                                            <span className="text-xs text-slate-400 animate-pulse">Waiting for payment...</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Visual Explanation of the Workflow */}
                <div className="bg-slate-50 p-4 border-t border-slate-200 text-xs text-slate-500 flex gap-6 justify-end">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div> Pending Review
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div> Quote Sent (Avg. 15m wait)
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div> Date Conflict
                    </div>
                </div>
            </Card>
        </div>
    );
}
