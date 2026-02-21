"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckCircle, AlertTriangle, User, Bus, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminApprovals() {
    const { getPendingOwners, approveOwner, rejectOwner } = useAuth();
    const [activeTab, setActiveTab] = useState("owners");
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshData = () => {
        setLoading(true);
        // Simulate fetch delay
        setTimeout(() => {
            const pending = getPendingOwners();
            setOwners(pending);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        refreshData();
    }, []);

    const handleApprove = (id) => {
        if (confirm("Are you sure you want to approve this partner?")) {
            approveOwner(id);
            refreshData();
        }
    };

    const handleReject = (id) => {
        if (confirm("Are you sure you want to reject this partner?")) {
            rejectOwner(id);
            refreshData();
        }
    };

    // Mock Buses for UI consistency (since we only implemented Owner Auth logic)
    const pendingBuses = [
        {
            id: 101,
            agency: "Royal Coaches",
            plate: "KA-01-XX-9999",
            type: "Luxury Coach",
            seats: 40,
            layout: "2x2",
            images: 4,
            risk: "Low",
            submitted: "1 hour ago"
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Pending Approvals</h1>
                    <p className="text-slate-500">Verify owners and bus listings.</p>
                </div>
                <Button variant="outline" size="sm" onClick={refreshData} className="gap-2">
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab("owners")}
                    className={`pb-3 px-1 border-b-2 font-medium transition-colors ${activeTab === "owners" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" /> Bus Owners ({owners.length})
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab("buses")}
                    className={`pb-3 px-1 border-b-2 font-medium transition-colors ${activeTab === "buses" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                >
                    <div className="flex items-center gap-2">
                        <Bus className="w-4 h-4" /> Vehicles ({pendingBuses.length})
                    </div>
                </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
                {activeTab === "owners" ? (
                    owners.length === 0 ? (
                        <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <p>No pending owner approvals.</p>
                        </div>
                    ) : (
                        owners.map((owner) => (
                            <Card key={owner.id} className="p-6 border-0 shadow-md">
                                <div className="flex flex-col lg:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-slate-900">{owner.company || "N/A"}</h3>
                                            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                                Verification Pending
                                            </span>
                                        </div>
                                        <div className="text-sm text-slate-600 grid grid-cols-2 gap-2 mb-2">
                                            <p><span className="font-semibold">Owner:</span> {owner.name}</p>
                                            <p><span className="font-semibold">City:</span> {owner.city || "N/A"}</p>
                                            <p><span className="font-semibold">Email:</span> {owner.email}</p>
                                            <p><span className="font-semibold">Phone:</span> {owner.phone}</p>
                                        </div>
                                        <p className="text-xs text-slate-400">Registered: {new Date(owner.joined).toLocaleString()}</p>
                                    </div>
                                    <div className="flex gap-2 items-start">
                                        <Button variant="success" size="sm" onClick={() => handleApprove(owner.id)}>Approve</Button>
                                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleReject(owner.id)}>Reject</Button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )
                ) : (
                    pendingBuses.map((bus) => (
                        <Card key={bus.id} className="p-6 border-0 shadow-md">
                            {/* Static content for buses as requested functionality focused on Owners */}
                            <div className="flex flex-col lg:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-slate-900">{bus.plate} <span className="text-sm font-normal text-slate-500">({bus.type})</span></h3>
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">Mock Data</span>
                                    </div>
                                    <p className="text-sm text-slate-600">This tab is for bus vehicle approvals (future scope).</p>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
