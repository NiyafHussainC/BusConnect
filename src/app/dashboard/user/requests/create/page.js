"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { MapPin, Shield, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

// Reuse the same mock data for now. In a real app, fetch by ID.
const ALL_BUSES = [
    {
        id: 1,
        agency: "Royal Travels",
        type: "Luxury Coach",
        seats: 40,
        ac: true,
        rating: 4.8,
        district: "Bangalore",
        image: "/hero.png",
        availability: { "2024-02-10": false },
        layout: "2x2",
        amenities: ["AC", "WiFi", "Charging", "Pushback"],
        pricePerDay: 4500
    },
    // ... (Other buses logic handled by finding ID)
    { id: 2, agency: "Kevin Transport", type: "Mini Bus", pricePerDay: 2500, image: "/hero.png" },
    { id: 3, agency: "Safe Journey", type: "30 Seater", pricePerDay: 3500, image: "/hero.png" },
    { id: 4, agency: "City Cruisers", type: "40 Seater", pricePerDay: 4000, image: "/hero.png" },
    { id: 5, agency: "GreenLine Travels", type: "Volvo Multi-Axle", pricePerDay: 5500, image: "/hero.png" }
];

function RequestCreateContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { createRequest, user } = useAuth();
    const [loading, setLoading] = useState(false);

    // Extract Data
    const busId = parseInt(searchParams.get('busId'));
    const district = searchParams.get('district');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const type = searchParams.get('type');
    const days = searchParams.get('days');

    const selectedBus = ALL_BUSES.find(b => b.id === busId);

    const [quoteData, setQuoteData] = useState({
        pickupLocation: "",
        dropLocation: "",
        notes: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const requestData = {
            busId: selectedBus.id,
            busType: selectedBus.type,
            agencyName: selectedBus.agency,
            tripType: type,
            district,
            startDate,
            endDate,
            days,
            pickupLocation: quoteData.pickupLocation,
            dropLocation: quoteData.dropLocation,
            notes: quoteData.notes,
            pricePerDay: selectedBus.pricePerDay
        };

        // Simulate API call via Context
        setTimeout(() => {
            const result = createRequest(requestData);
            setLoading(false);
            if (result.success) {
                router.push('/dashboard/user/requests');
            }
        }, 1500);
    };

    if (!selectedBus) {
        return <div className="p-8">Bus not found. <Link href="/dashboard/user" className="text-blue-600">Go back</Link></div>;
    }

    return (
        <div className="max-w-4xl mx-auto animate-in slide-in-from-right-8 duration-500">
            <Link href={`/dashboard/user/buses?${searchParams.toString()}`} className="text-sm text-slate-500 hover:text-orange-600 flex items-center gap-1 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Cancel & Back to Results
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Summary Card */}
                <div className="lg:col-span-1">
                    <Card className="p-6 bg-slate-50 sticky top-24">
                        <h3 className="font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">Selected Vehicle</h3>
                        <div className="w-full h-40 bg-slate-200 rounded-lg relative overflow-hidden mb-4">
                            <Image src={selectedBus.image} alt={selectedBus.type} fill className="object-cover" />
                        </div>
                        <h4 className="text-lg font-bold">{selectedBus.type}</h4>
                        <p className="text-sm text-slate-500 mb-4">{selectedBus.agency}</p>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-slate-500">From</span>
                                <span className="font-medium text-right">{district}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Dates</span>
                                <span className="font-medium text-right">{startDate} <br />to {type === 'roundtrip' ? endDate : '(One-way)'}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-slate-200">
                                <span className="text-slate-900 font-bold">Total Duration</span>
                                <span className="font-bold text-orange-600">{days} Days</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Main Form */}
                <div className="lg:col-span-2">
                    <Card className="shadow-lg border-0 overflow-hidden">
                        <div className="bg-orange-600 p-6 text-white">
                            <h2 className="text-xl font-bold">Finalize Quote Request</h2>
                            <p className="text-orange-100 text-sm mt-1">
                                Provide exact location details for an accurate price quote.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    label="Exact Pickup Address"
                                    placeholder="Street, Area, Landmark"
                                    required
                                    value={quoteData.pickupLocation}
                                    onChange={(e) => setQuoteData({ ...quoteData, pickupLocation: e.target.value })}
                                    icon={MapPin}
                                />
                                <Input
                                    label="Drop Destination"
                                    placeholder="Hotel, City Center, etc."
                                    required
                                    value={quoteData.dropLocation}
                                    onChange={(e) => setQuoteData({ ...quoteData, dropLocation: e.target.value })}
                                    icon={MapPin}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Special Instructions / Notes</label>
                                <textarea
                                    className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none min-h-[100px] transition-all"
                                    placeholder="E.g. Need roof carrier, night halt required, playing devotional songs allowed?"
                                    value={quoteData.notes}
                                    onChange={(e) => setQuoteData({ ...quoteData, notes: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                                <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-blue-800">
                                    This request will be sent directly to <strong>{selectedBus.agency}</strong>. They will verify your route feasibility and send a custom price quote to your dashboard.
                                </p>
                            </div>

                            <Button
                                variant="primary"
                                type="submit"
                                className="w-full h-12 text-lg font-bold flex items-center justify-center gap-2"
                                disabled={loading}
                            >
                                {loading ? "Sending Request..." : "Submit Request"}
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default function RequestCreatePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-12">Loading...</div>}>
            <RequestCreateContent />
        </Suspense>
    );
}
