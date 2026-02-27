"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Users, Grid, Wifi, Zap, Music, Wind, Filter, AlertCircle, ArrowLeft, Star, CheckCircle, Calendar, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
// In real app, import from a shared constant file
const ALL_BUSES = [
    {
        id: 1,
        agency: "Royal Travels",
        type: "Luxury Coach",
        seats: 40,
        ac: true,
        rating: 4.8,
        district: "Bengaluru Urban", // Using valid Karnataka district
        image: "/hero.png",
        availability: { "2026-03-05": false, "2026-03-06": false },
        layout: "2x2",
        amenities: ["AC", "WiFi", "Charging", "Pushback"],
        pricePerDay: 4500
    },
    {
        id: 2,
        agency: "Kevin Transport",
        type: "Mini Bus",
        seats: 20,
        ac: false,
        rating: 4.5,
        district: "Bengaluru Urban",
        image: "/hero.png",
        availability: {},
        layout: "2x1",
        amenities: ["Non-AC", "Music System"],
        pricePerDay: 2500
    },
    {
        id: 3,
        agency: "Safe Journey",
        type: "30 Seater",
        seats: 30,
        ac: true,
        rating: 4.2,
        district: "Mysuru",
        image: "/hero.png",
        availability: {},
        layout: "2x3",
        amenities: ["AC", "TV"],
        pricePerDay: 3500
    },
    {
        id: 4,
        agency: "City Cruisers",
        type: "40 Seater",
        seats: 40,
        ac: false,
        rating: 4.0,
        district: "Bengaluru Urban",
        image: "/hero.png",
        availability: {},
        layout: "2x2",
        amenities: ["Non-AC", "Luggage"],
        pricePerDay: 4000
    },
    {
        id: 5,
        agency: "GreenLine Travels",
        type: "Volvo Multi-Axle",
        seats: 45,
        ac: true,
        rating: 4.9,
        district: "Dakshina Kannada",
        image: "/hero.png",
        availability: {},
        layout: "2x2",
        amenities: ["AC", "WiFi", "Toilet"],
        pricePerDay: 5500,
        isBooked: true
    }
];

// Reusable Modal Component to show next 30 days
function AvailabilityModal({ bus, onClose }) {
    if (!bus) return null;

    // Generate upcoming 30 days
    const today = new Date();
    const days = Array.from({ length: 30 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        // Format to YYYY-MM-DD
        const dateString = d.toISOString().split("T")[0];

        // Simple logic for checking the dictionary
        const isBooked = bus.availability && bus.availability[dateString] === false;

        return {
            date: d,
            dateString,
            isBooked
        };
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-600" />
                        Availability: {bus.agency}
                    </h3>
                    <button onClick={onClose} className="p-1 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <p className="text-sm text-slate-500 mb-6">
                        Showing bus availability for the next 30 days. Booked dates are marked in red.
                    </p>

                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-2">
                        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {/* Empty padding for start of month alignment (simplified: just lists days consecutively from today) */}
                        {days.map((dayObj, i) => {
                            const isToday = i === 0;
                            const statusColor = dayObj.isBooked
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 cursor-pointer";

                            return (
                                <div
                                    key={dayObj.dateString}
                                    className={`aspect-square sm:aspect-auto sm:h-auto sm:py-2 flex flex-col items-center justify-center rounded-lg border ${statusColor} relative`}
                                    title={`${dayObj.date.toLocaleDateString()} - ${dayObj.isBooked ? 'Booked' : 'Available'}`}
                                >
                                    <span className="text-xs sm:text-sm font-semibold">{dayObj.date.getDate()}</span>
                                    {isToday && <span className="absolute bottom-0 text-[8px] font-bold uppercase tracking-wider mb-1 hidden sm:block">Today</span>}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                            <span className="text-slate-600">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-red-500"></div>
                            <span className="text-slate-600">Booked</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BusResultsContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Parse Params
    const district = searchParams.get("district");
    const requestedPax = parseInt(searchParams.get("pax") || "0");
    const requestedAC = searchParams.get("ac"); // 'yes', 'no', 'any'
    const tripType = searchParams.get("type");
    const days = searchParams.get("days");
    const startDate = searchParams.get("startDate");

    // Modal State
    const [viewingBusDates, setViewingBusDates] = useState(null);

    // Filter Logic
    const filteredBuses = ALL_BUSES.filter(bus => {
        // District
        if (district && bus.district !== district) return false;

        // Capacity
        if (bus.seats < requestedPax) return false;

        // AC
        if (requestedAC === "yes" && !bus.ac) return false;
        if (requestedAC === "no" && bus.ac) return false;

        return true;
    });

    const handleRequestBus = (busId) => {
        // Redirect to request creation page with busId and existing search params
        const params = new URLSearchParams(searchParams);
        params.set('busId', busId);
        router.push(`/dashboard/user/requests/create?${params.toString()}`);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <Link href="/dashboard/user" className="text-sm text-slate-500 hover:text-orange-600 flex items-center gap-1 mb-2 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Planning
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Available Buses</h1>
                    <p className="text-slate-500">
                        Showing results for {district} • {requestedPax} Pax • {requestedAC === 'any' ? 'Any AC' : (requestedAC === 'yes' ? 'AC Only' : 'Non-AC')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Results List */}
                <div className="lg:col-span-3 space-y-6">

                    {filteredBuses.length === 0 && (
                        <Card className="p-12 text-center border-dashed border-2 border-slate-300 bg-slate-50/50">
                            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertCircle className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No Buses Found</h3>
                            <p className="text-slate-500 max-w-md mx-auto mt-2">
                                Try adjusting your search criteria or looking in a different district.
                            </p>
                            <Link href="/dashboard/user">
                                <Button variant="primary" className="mt-6">Modify Search</Button>
                            </Link>
                        </Card>
                    )}

                    {filteredBuses.map((bus) => (
                        <Card key={bus.id} className={`p-0 overflow-hidden flex flex-col md:flex-row hover:shadow-lg transition-shadow border-l-4 ${bus.isBooked ? 'border-l-slate-300 bg-slate-50 opacity-90' : 'border-l-orange-500'}`}>

                            {/* Image Section */}
                            <div className="w-full md:w-64 h-48 md:h-auto relative bg-slate-200 shrink-0">
                                <Image src={bus.image} alt={bus.type} fill className={`object-cover ${bus.isBooked ? 'grayscale' : ''}`} />
                                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold shadow-sm">
                                    {bus.agency}
                                </div>
                                {bus.isBooked && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                                        <span className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Booked</span>
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={`text-xl font-bold ${bus.isBooked ? 'text-slate-500' : 'text-slate-900'}`}>{bus.type}</h3>
                                        {!bus.isBooked && (
                                            <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                                {bus.rating} <Star className="w-3 h-3 fill-current" />
                                            </div>
                                        )}
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
                                        {bus.ac ? (
                                            <div className="flex items-center gap-1.5 bg-cyan-50 px-2 py-1 rounded text-cyan-700">
                                                <Wind className="w-4 h-4" /> AC
                                            </div>
                                        ) : (
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
                                        {days && parseInt(days) > 0 ? (
                                            <>
                                                <span className="text-2xl font-bold text-slate-900">₹{bus.pricePerDay * parseInt(days)}</span>
                                                <span className="text-xs text-slate-500 ml-1">approx for {days} days</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-2xl font-bold text-slate-900">₹{bus.pricePerDay}</span>
                                                <span className="text-xs text-slate-500 ml-1">per day</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            variant="outline"
                                            className="text-xs h-8 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                                            onClick={() => setViewingBusDates(bus)}
                                            disabled={bus.isBooked}
                                        >
                                            <Calendar className="w-3 h-3 mr-1" /> View Availability
                                        </Button>
                                        <Button
                                            variant="accent"
                                            disabled={bus.isBooked}
                                            onClick={() => handleRequestBus(bus.id)}
                                        >
                                            {bus.isBooked ? "Unavailable" : "Request This Bus"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Sidebar Info */}
                <div className="hidden lg:block lg:col-span-1 space-y-6">
                    <Card className="p-6 bg-blue-50 border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-2">How it works</h3>
                        <ul className="space-y-3 text-sm text-blue-800">
                            <li className="flex gap-2">
                                <span className="font-bold text-blue-600">1.</span>
                                <span>Request a bus to check availability.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold text-blue-600">2.</span>
                                <span>Owner reviews route and confirms price.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold text-blue-600">3.</span>
                                <span>Pay small advance to confirm booking.</span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>

            {/* Render Modal */}
            {viewingBusDates && (
                <AvailabilityModal
                    bus={viewingBusDates}
                    onClose={() => setViewingBusDates(null)}
                />
            )}
        </div>
    );
}

export default function BusResultsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-12">Loading results...</div>}>
            <BusResultsContent />
        </Suspense>
    );
}
