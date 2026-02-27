"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock, CheckCircle, XCircle, CreditCard, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function UserRequestsPage() {
    const { getUserRequests, payAdvance, completeTrip } = useAuth();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activePaymentRequest, setActivePaymentRequest] = useState(null);
    const [couponCode, setCouponCode] = useState("");

    useEffect(() => {
        // Load requests on mount
        const load = () => {
            setRequests(getUserRequests());
            setLoading(false);
        };
        // Small delay to simulate fetch
        setTimeout(load, 500);
    }, [getUserRequests]); // Depend on function reference

    const handlePay = (id) => {
        if (activePaymentRequest === id) {
            // Proceed to pay
            const result = payAdvance(id, couponCode.trim());
            if (result.success) {
                alert("Payment Successful! Bus Booking Confirmed.");
                setRequests(getUserRequests()); // Refresh list
                setActivePaymentRequest(null);
                setCouponCode("");
            } else {
                alert(result.message);
            }
        } else {
            // Expand payment section
            setActivePaymentRequest(id);
            setCouponCode("");
        }
    };

    const handleComplete = (id) => {
        if (confirm("Are you sure you want to mark this trip as completed? You will earn 2 credits.")) {
            const result = completeTrip(id);
            if (result.success) {
                if (result.couponGenerated) {
                    alert(`Trip completed! You earned 2 credits. 🎉 Congratulations, you've reached 10 credits and earned a 10% Discount Coupon! Check your Rewards page.`);
                } else {
                    alert(`Trip completed! You earned 2 credits. You now have ${result.credits} credits.`);
                }
                setRequests(getUserRequests());
            } else {
                alert(result.message);
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500">Loading your requests...</div>;

    if (requests.length === 0) {
        return (
            <div className="text-center py-16 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">No Past Requests</h2>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                    You haven't requested any buses yet. Start by planning your next trip!
                </p>
                <Link href="/dashboard/user">
                    <Button variant="primary">Plan a Trip</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-bold text-slate-900 mb-6">My Requests & Bookings</h1>

            <div className="space-y-4">
                {requests.map((request) => (
                    <Card key={request.id} className="p-6 overflow-hidden border-l-4 border-l-slate-300">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                            {/* Left: Info */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${request.status === 'requested' ? 'bg-blue-100 text-blue-700' :
                                        request.status === 'quoted' ? 'bg-purple-100 text-purple-700 animate-pulse' :
                                            request.status === 'booked' ? 'bg-green-100 text-green-700' :
                                                request.status === 'completed' ? 'bg-slate-200 text-slate-700' :
                                                    'bg-red-100 text-red-700'
                                        }`}>
                                        {request.status}
                                    </span>
                                    <span className="text-sm text-slate-400">#REQ-{request.id}</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">{request.district} Trip</h3>
                                <p className="text-slate-500 text-sm">
                                    {request.startDate} • {request.days} Days • {request.pax} Passengers
                                </p>
                                <p className="text-slate-500 text-sm mt-1">
                                    Agency: <span className="font-medium text-slate-700">{request.agencyName}</span>
                                </p>
                            </div>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-4">
                                {request.status === 'booked' && (
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1 text-green-600 font-bold mb-2">
                                            <CheckCircle className="w-5 h-5" /> Confirmed
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" className="text-xs h-8">Download Ticket</Button>
                                            <Button variant="primary" className="text-xs h-8 bg-indigo-600 hover:bg-indigo-700" onClick={() => handleComplete(request.id)}>Complete Trip</Button>
                                        </div>
                                    </div>
                                )}

                                {request.status === 'completed' && (
                                    <div className="text-right">
                                        <div className="flex items-center justify-end gap-1 text-slate-600 font-bold mb-1">
                                            <CheckCircle className="w-5 h-5" /> Trip Completed
                                        </div>
                                        <span className="text-xs text-orange-600 font-bold">+2 Credits Earned</span>
                                    </div>
                                )}

                                {request.status === 'quoted' && (
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500 mb-2">Quote Received</p>

                                        {activePaymentRequest === request.id ? (
                                            <div className="flex flex-col gap-2 relative z-10">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Promo Code"
                                                    className="border border-slate-300 rounded px-3 py-1.5 text-sm outline-none focus:border-orange-500"
                                                    value={couponCode}
                                                    onChange={(e) => setCouponCode(e.target.value)}
                                                />
                                                <div className="flex gap-2">
                                                    <Button variant="outline" className="text-xs flex-1" onClick={() => setActivePaymentRequest(null)}>Cancel</Button>
                                                    <Button variant="primary" onClick={() => handlePay(request.id)} className="flex items-center justify-center gap-1 text-xs flex-1">
                                                        Pay Now
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="primary" onClick={() => handlePay(request.id)} className="flex items-center gap-2">
                                                    <CreditCard className="w-4 h-4" /> Pay Advance
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {request.status === 'requested' && (
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500 flex items-center gap-1">
                                            <Clock className="w-4 h-4" /> Waiting for response
                                        </p>
                                    </div>
                                )}

                                {request.status === 'declined' && (
                                    <div className="text-right">
                                        <p className="text-sm text-red-500 flex items-center gap-1">
                                            <XCircle className="w-4 h-4" /> Unavailable
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
