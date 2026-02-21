"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Users, Grid, Wifi, Zap, Music, Wind, Filter, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Suspense } from "react";

function BusSearchContent() {
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const router = useRouter();

    // Parse Params
    const requestedPax = parseInt(searchParams.get("pax") || "0");
    const requestedAC = searchParams.get("ac") === "true";
    const tripType = searchParams.get("type");
    const days = searchParams.get("days");

    // Mock Database
    const allBuses = [
        {
            id: 1,
            agency: "Royal Travels",
            plate: "KA-01-AB-1234",
            type: "Luxury Coach",
            seats: 40,
            layout: "2x2",
            amenities: ["AC", "WiFi", "Charging", "Pushback"],
            rating: 4.8,
            pricePerDay: 4500,
            image: "/hero.png",
            isAc: true
        },
        {
            id: 2,
            agency: "Kevin Transport",
            plate: "KA-53-MC-9988",
            type: "Mini Bus",
            seats: 20,
            layout: "2x1",
            amenities: ["Non-AC", "Music System"],
            rating: 4.5,
            pricePerDay: 2500,
            image: "/hero.png",
            isAc: false
        },
        {
            id: 3,
            agency: "Safe Journey",
            plate: "KA-05-ZZ-5555",
            type: "30 Seater",
            seats: 30,
            layout: "2x3",
            amenities: ["AC", "TV"],
            rating: 4.2,
            pricePerDay: 3500,
            image: "/hero.png",
            isAc: true
        },
        {
            id: 4,
            agency: "City Cruisers",
            plate: "KA-04-DD-4444",
            type: "40 Seater",
            seats: 40,
            layout: "2x2",
            amenities: ["Non-AC", "Luggage"],
            rating: 4.0,
            pricePerDay: 4000,
            image: "/hero.png",
            isAc: false
        }
    ];

    const filteredBuses = allBuses.filter(bus => {
        // Capacity Check
        if (bus.seats < requestedPax) return false;

        // AC Check
        if (requestedAC && !bus.isAc) return false;
        // if (!requestedAC && bus.isAc) return false; // Relaxed check for non-AC requests

        return true;
    });

    return (
        <div className="bg-slate-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Available Buses</h1>
                        <p className="text-slate-500">
                            {tripType ? `${tripType} Trip` : 'Trip'} • {requestedPax} Pax • {requestedAC ? "AC" : "Non-AC"} • {days ? `${days} Days` : 'Duration TBD'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href="/request">
                            <Button variant="outline">Modify Search</Button>
                        </Link>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Filters */}
                    <div className="hidden lg:block lg:col-span-1 space-y-6">
                        <Card className="p-6">
                            <h3 className="font-bold mb-4">Refine Results</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Bus Type</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2"><input type="checkbox" /> Mini Bus</label>
                                        <label className="flex items-center gap-2"><input type="checkbox" /> 30 Seater</label>
                                        <label className="flex items-center gap-2"><input type="checkbox" /> Luxury Coach</label>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Results List */}
                    <div className="lg:col-span-3 space-y-6">

                        {filteredBuses.length === 0 && (
                            <div className="bg-white p-12 text-center rounded-xl shadow-sm">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">No Buses Found</h3>
                                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                                    We couldn't find any buses matching your specific requirements ({requestedPax} pax, {requestedAC ? 'AC' : 'Non-AC'}).
                                </p>
                                <Link href="/request">
                                    <Button variant="primary">Adjust Search Criteria</Button>
                                </Link>
                            </div>
                        )}

                        {filteredBuses.map((bus) => (
                            <Card key={bus.id} className="p-0 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow">
                                {/* Image Section */}
                                <div className="w-full md:w-64 h-48 md:h-auto relative bg-slate-200 shrink-0">
                                    <Image src={bus.image} alt={bus.type} fill className="object-cover" />
                                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                                        {bus.agency}
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-slate-900">{bus.type}</h3>
                                            <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                                {bus.rating} ★
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                                            <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded">
                                                <Users className="w-4 h-4 text-slate-500" />
                                                <span className="font-semibold text-slate-900">{bus.seats} Seats</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded">
                                                <Grid className="w-4 h-4 text-slate-500" />
                                                <span className="font-semibold text-slate-900">{bus.layout}</span>
                                            </div>
                                            {bus.isAc && (
                                                <div className="flex items-center gap-1.5 bg-cyan-50 px-2 py-1 rounded text-cyan-700">
                                                    <Wind className="w-4 h-4" /> AC
                                                </div>
                                            )}
                                            {!bus.isAc && (
                                                <div className="flex items-center gap-1.5 bg-orange-50 px-2 py-1 rounded text-orange-700">
                                                    <Wind className="w-4 h-4" /> Non-AC
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-3 mb-4">
                                            {bus.amenities.map(a => {
                                                if (a === "AC" || a === "Non-AC") return null;
                                                return (
                                                    <span key={a} className="text-xs text-slate-500 flex items-center gap-1 border border-slate-200 px-2 py-1 rounded-full">
                                                        {a === "WiFi" && <Wifi className="w-3 h-3" />}
                                                        {a === "Charging" && <Zap className="w-3 h-3" />}
                                                        {a === "Music System" && <Music className="w-3 h-3" />}
                                                        {a}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                                        <div>
                                            {days > 0 ? (
                                                <>
                                                    <span className="text-2xl font-bold text-slate-900">₹{bus.pricePerDay * days}</span>
                                                    <span className="text-xs text-slate-500 ml-1">total for {days} days</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-2xl font-bold text-slate-900">₹{bus.pricePerDay}</span>
                                                    <span className="text-xs text-slate-500 ml-1">per day</span>
                                                </>
                                            )}
                                        </div>
                                        <Link href="/request">
                                            <Button variant="accent">Request This Bus</Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function BusSearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <BusSearchContent />
        </Suspense>
    );
}
