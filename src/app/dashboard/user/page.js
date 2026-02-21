"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PlanTrip() {
    const router = useRouter();
    const [journeyType, setJourneyType] = useState("oneway");
    const [searchData, setSearchData] = useState({
        state: "Karnataka",
        district: "",
        startDate: "",
        endDate: "",
        pax: "",
        ac: "any",
    });

    const handleSearch = (e) => {
        e.preventDefault();

        // Construct Query Params
        const params = new URLSearchParams({
            type: journeyType,
            ...searchData
        });

        // Calculate Days if dates are present
        if (searchData.startDate) {
            if (journeyType === "oneway") {
                params.set('days', '1');
            } else if (searchData.endDate) {
                const start = new Date(searchData.startDate);
                const end = new Date(searchData.endDate);
                const timeDiff = end - start;
                const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                params.set('days', String(dayDiff > 0 ? dayDiff + 1 : 1));
            }
        }

        router.push(`/dashboard/user/buses?${params.toString()}`);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-slate-900">Plan Your Trip</h1>
                <p className="text-slate-500 mt-2">Where do you want to go next?</p>
            </div>

            <Card className="max-w-4xl mx-auto shadow-xl border-0 overflow-hidden">
                <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        Trip Details
                    </h2>
                    <div className="flex bg-slate-800 rounded-lg p-1">
                        <button
                            onClick={() => setJourneyType("oneway")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${journeyType === "oneway" ? "bg-orange-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                        >
                            One-way
                        </button>
                        <button
                            onClick={() => setJourneyType("roundtrip")}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${journeyType === "roundtrip" ? "bg-orange-600 text-white shadow" : "text-slate-400 hover:text-white"}`}
                        >
                            Round-trip
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSearch} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Pickup Region */}
                    <Select
                        label="Pickup State"
                        value={searchData.state}
                        onChange={(e) => setSearchData({ ...searchData, state: e.target.value })}
                        options={[{ value: "Karnataka", label: "Karnataka" }]}
                        disabled
                    />
                    <Select
                        label="Pickup District/City"
                        required
                        value={searchData.district}
                        onChange={(e) => setSearchData({ ...searchData, district: e.target.value })}
                        options={[
                            { value: "", label: "Select District" },
                            { value: "Bangalore", label: "Bangalore" },
                            { value: "Mysore", label: "Mysore" },
                            { value: "Mangalore", label: "Mangalore" },
                        ]}
                    />

                    {/* Dates */}
                    <Input
                        label="Departure Date"
                        type="date"
                        required
                        value={searchData.startDate}
                        onChange={(e) => setSearchData({ ...searchData, startDate: e.target.value })}
                    />
                    {journeyType === "roundtrip" ? (
                        <Input
                            label="Return Date"
                            type="date"
                            required
                            value={searchData.endDate}
                            min={searchData.startDate}
                            onChange={(e) => setSearchData({ ...searchData, endDate: e.target.value })}
                        />
                    ) : (
                        <div className="bg-slate-50 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm h-[50px] mt-7">
                            Return Date not applicable
                        </div>
                    )}

                    {/* Passengers & Preference */}
                    <Input
                        label="Number of Passengers"
                        type="number"
                        min="10"
                        required
                        placeholder="Total group size"
                        value={searchData.pax}
                        onChange={(e) => setSearchData({ ...searchData, pax: e.target.value })}
                        icon={Users}
                    />
                    <Select
                        label="Bus AC Preference"
                        value={searchData.ac}
                        onChange={(e) => setSearchData({ ...searchData, ac: e.target.value })}
                        options={[
                            { value: "any", label: "No Preference (Show All)" },
                            { value: "yes", label: "AC Bus Only" },
                            { value: "no", label: "Non-AC Bus Only" },
                        ]}
                    />

                    {/* Search Action */}
                    <div className="md:col-span-2 pt-4">
                        <Button variant="primary" type="submit" className="w-full h-12 text-lg shadow-lg shadow-orange-900/10 flex items-center justify-center gap-2">
                            Available Buses <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}
