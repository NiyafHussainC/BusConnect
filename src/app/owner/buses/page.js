"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Plus, Bus, Wifi, Zap, Music, Lock, Crown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function MyBuses() {
    const { user } = useAuth();

    // Mock Data (would typically fetch from API)
    const myBuses = [
        {
            id: 1,
            plate: "KA-01-AB-1234",
            type: "Luxury Coach",
            seats: 40,
            layout: "2x2",
            amenities: ["AC", "WiFi", "Charging"],
            status: "Approved",
            earnings: "₹1.2L"
        },
        {
            id: 2,
            plate: "KA-53-MC-9988",
            type: "Mini Bus",
            seats: 20,
            layout: "2x1",
            amenities: ["Non-AC", "Music"],
            status: "Approved",
            earnings: "₹45k"
        }
    ];

    // Limit Logic
    const busLimit = user?.subscription?.limit || 0;
    const activeCount = user?.subscription?.activeBuses || myBuses.length; // Use mock count from context
    const isLimitReached = activeCount >= busLimit;
    const planName = user?.subscription?.plan || "Free Trial";

    return (
        <div className="space-y-8 bg-slate-50 min-h-screen p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">My Fleet</h1>
                    <p className="text-slate-500">Manage your buses and availability.</p>
                </div>

                {isLimitReached ? (
                    <div className="flex items-center gap-4 bg-orange-50 border border-orange-100 p-3 rounded-lg">
                        <div className="text-sm">
                            <p className="font-bold text-orange-800 flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Bus Limit Reached ({activeCount}/{busLimit})
                            </p>
                            <p className="text-orange-600 text-xs">Upgrade your <strong>{planName}</strong> to add more.</p>
                        </div>
                        <Link href="/owner/subscription">
                            <Button variant="accent" size="sm" className="whitespace-nowrap flex items-center gap-1">
                                <Crown className="w-3 h-3" /> Upgrade
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Link href="/owner/buses/add">
                        <Button variant="primary" className="flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Add New Bus
                        </Button>
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myBuses.map((bus) => (
                    <Card key={bus.id} className="p-0 overflow-hidden border-0 shadow-md group hover:shadow-lg transition-all">
                        <div className="h-48 bg-slate-200 relative">
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                {bus.status}
                            </div>
                            {/* Placeholder for Bus Image */}
                            <div className="flex items-center justify-center h-full text-slate-400">
                                <Bus className="w-12 h-12" />
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{bus.plate}</h3>
                                    <p className="text-slate-500 text-sm">{bus.type}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Earnings</p>
                                    <p className="font-bold text-green-600">{bus.earnings}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-lg text-sm">
                                <div>
                                    <span className="block text-slate-400 text-xs">Capacity</span>
                                    <span className="font-medium text-slate-900">{bus.seats} Seats</span>
                                </div>
                                <div>
                                    <span className="block text-slate-400 text-xs">Layout</span>
                                    <span className="font-medium text-slate-900">{bus.layout}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {bus.amenities.includes("WiFi") && <Wifi className="w-4 h-4 text-slate-400" />}
                                {bus.amenities.includes("Charging") && <Zap className="w-4 h-4 text-slate-400" />}
                                {bus.amenities.includes("Music") && <Music className="w-4 h-4 text-slate-400" />}
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">Edit</Button>
                                <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100">Disable</Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
