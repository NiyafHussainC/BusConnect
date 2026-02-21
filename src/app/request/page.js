"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { CheckCircle, Shield, Calculator, MapPin, Calendar, Users, Bus, ArrowRight, Star, Wind, Filter, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Mock Database of Verified Buses
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
        availability: { "2024-02-10": false }
    },
    {
        id: 2,
        agency: "Kevin Transport",
        type: "Mini Bus",
        seats: 20,
        ac: false,
        rating: 4.5,
        district: "Bangalore",
        image: "/hero.png",
        availability: {}
    },
    {
        id: 3,
        agency: "Safe Journey",
        type: "30 Seater",
        seats: 30,
        ac: true,
        rating: 4.2,
        district: "Mysore",
        image: "/hero.png",
        availability: {}
    },
    {
        id: 4,
        agency: "City Cruisers",
        type: "40 Seater",
        seats: 40,
        ac: false,
        rating: 4.0,
        district: "Bangalore",
        image: "/hero.png",
        availability: {}
    },
    {
        id: 5,
        agency: "GreenLine Travels",
        type: "Volvo Multi-Axle",
        seats: 45,
        ac: true,
        rating: 4.9,
        district: "Mangalore",
        image: "/hero.png",
        availability: {},
        isBooked: true // Simulating booked status
    }
];

export default function RequestBus() {
    const { user } = useAuth();
    const router = useRouter();

    // Workflow State: 'search' | 'quote' | 'success'
    const [step, setStep] = useState('search');

    // Form State
    const [journeyType, setJourneyType] = useState("oneway"); // oneway | roundtrip
    const [searchData, setSearchData] = useState({
        state: "Karnataka", // Default for mock
        district: "",
        startDate: "",
        endDate: "",
        pax: "",
        ac: "any",
    });

    const [quoteData, setQuoteData] = useState({
        pickupLocation: "",
        dropLocation: "",
        notes: ""
    });

    const [selectedBus, setSelectedBus] = useState(null);
    const [days, setDays] = useState(0);
    const [matchedBuses, setMatchedBuses] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // Access Control
    useEffect(() => {
        if (user && user.role === 'owner') {
            router.push("/owner/dashboard");
        }
    }, [user, router]);

    // Calculate Days
    useEffect(() => {
        if (searchData.startDate) {
            if (journeyType === "oneway") {
                setDays(1);
            } else if (searchData.endDate) {
                const start = new Date(searchData.startDate);
                const end = new Date(searchData.endDate);
                const timeDiff = end - start;
                const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
                setDays(dayDiff > 0 ? dayDiff + 1 : 1); // Inclusive dates
            }
        }
    }, [searchData.startDate, searchData.endDate, journeyType]);

    // Handle Search Submit
    const handleSearch = (e) => {
        e.preventDefault();

        // Filter Logic
        const results = ALL_BUSES.filter(bus => {
            // 1. District Check (Primary Filter)
            if (bus.district !== searchData.district) return false;

            // 2. Capacity Check
            if (bus.seats < parseInt(searchData.pax)) return false;

            // 3. AC Preference Check
            if (searchData.ac === "yes" && !bus.ac) return false;
            if (searchData.ac === "no" && bus.ac) return false;

            // 4. Availability Check (Mock)
            if (bus.availability[searchData.startDate]) return false;
            if (journeyType === "roundtrip" && bus.availability[searchData.endDate]) return false;

            return true;
        });

        setMatchedBuses(results);
        setHasSearched(true);
        setSelectedBus(null); // Reset selection

        // Scroll to results
        setTimeout(() => {
            document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }

    // Handle Quote Request Selection
    const handleSelectBus = (bus) => {
        setSelectedBus(bus);
        setStep('quote');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle Final Quote Submission
    const handleSubmitQuote = (e) => {
        e.preventDefault();
        // In real app: API call to create request record
        console.log("Submitting Quote Request:", {
            busId: selectedBus.id,
            ...searchData,
            ...quoteData,
            days,
            journeyType
        });
        setStep('success');
    }

    // Auth Guard UI
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Card className="max-w-md w-full p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Please Login</h2>
                    <p className="text-slate-600 mb-6">You need to be logged in as a Customer to request a bus.</p>
                    <Button variant="primary" onClick={() => router.push('/login/customer')}>Login as Customer</Button>
                </Card>
            </div>
        )
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- STAGE 1: SEARCH --- */}
                {step === 'search' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Find a Bus</h1>
                            <p className="text-slate-500">Search for verified buses in your area.</p>
                        </div>

                        <Card className="shadow-xl border-0 overflow-hidden mb-8">
                            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-accent" />
                                    Search Criteria
                                </h2>
                                <div className="flex bg-slate-800 rounded-lg p-1">
                                    <button
                                        onClick={() => setJourneyType("oneway")}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${journeyType === "oneway" ? "bg-accent text-white shadow" : "text-slate-400 hover:text-white"}`}
                                    >
                                        One-way
                                    </button>
                                    <button
                                        onClick={() => setJourneyType("roundtrip")}
                                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${journeyType === "roundtrip" ? "bg-accent text-white shadow" : "text-slate-400 hover:text-white"}`}
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
                                <div className="md:col-span-2">
                                    <Button variant="primary" type="submit" className="w-full h-12 text-lg shadow-lg shadow-primary/20">
                                        Search Available Buses
                                    </Button>
                                </div>
                            </form>
                        </Card>

                        {/* Results Section */}
                        {hasSearched && (
                            <div id="results-section" className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                                    <Bus className="w-6 h-6 text-primary" />
                                    Available Buses
                                    <span className="bg-slate-200 text-slate-700 text-sm px-2 py-0.5 rounded-full">{matchedBuses.length} Found</span>
                                </h2>

                                {matchedBuses.length === 0 ? (
                                    <Card className="p-12 text-center border-dashed border-2 border-slate-300 bg-slate-50/50">
                                        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Bus className="w-8 h-8 text-slate-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900">No Buses Found</h3>
                                        <p className="text-slate-500 max-w-md mx-auto mt-2">
                                            Try searching in a different district or adjusting your requirements.
                                        </p>
                                    </Card>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {matchedBuses.map((bus) => (
                                            <Card key={bus.id} className={`p-6 hover:shadow-lg transition-all border-l-4 flex flex-col md:flex-row gap-6 relative overflow-hidden ${bus.isBooked ? 'border-l-slate-300 bg-slate-50 opacity-90' : 'border-l-primary'}`}>

                                                {/* Booked Overlay Notification */}
                                                {bus.isBooked && (
                                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                                                        <div className="bg-white p-6 rounded-xl shadow-2xl border border-slate-200 max-w-sm text-center mx-4">
                                                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                                <CheckCircle className="w-6 h-6 text-slate-400" />
                                                            </div>
                                                            <h4 className="text-slate-900 font-bold mb-2">Bus No Longer Available</h4>
                                                            <p className="text-slate-600 text-sm mb-0 leading-relaxed">
                                                                This bus has been booked by another customer. Please select another available bus or choose a different date.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="w-full md:w-48 h-32 bg-slate-200 rounded-lg relative overflow-hidden shrink-0">
                                                    <Image src={bus.image} alt={bus.type} fill className={`object-cover ${bus.isBooked ? 'grayscale' : ''}`} />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className={`text-xl font-bold ${bus.isBooked ? 'text-slate-500' : 'text-slate-900'}`}>{bus.type}</h3>
                                                            <p className="text-sm text-slate-500 font-medium">{bus.agency}</p>
                                                        </div>
                                                        {!bus.isBooked && (
                                                            <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-bold">
                                                                <Star className="w-3 h-3 fill-green-700" /> {bus.rating}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-4 text-sm text-slate-700 mt-3">
                                                        <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-md">
                                                            <Users className="w-4 h-4 text-slate-500" />
                                                            <span className="font-semibold">{bus.seats} Seats</span>
                                                        </div>
                                                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${bus.ac ? 'bg-cyan-50 text-cyan-800' : 'bg-orange-50 text-orange-800'}`}>
                                                            <Wind className="w-4 h-4" />
                                                            <span className="font-semibold">{bus.ac ? "AC" : "Non-AC"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center gap-2">
                                                    <Button variant="accent" onClick={() => handleSelectBus(bus)} disabled={bus.isBooked}>
                                                        {bus.isBooked ? "Unavailable" : "Request Quote"}
                                                    </Button>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* --- STAGE 2: QUOTE REQUEST --- */}
                {step === 'quote' && selectedBus && (
                    <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                        <Button
                            variant="ghost"
                            onClick={() => setStep('search')}
                            className="mb-6 pl-0 hover:bg-transparent hover:text-primary"
                        >
                            ← Back to Search Results
                        </Button>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                            {/* Selected Bus Summary */}
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
                                            <span className="font-medium">{searchData.district}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Dates</span>
                                            <span className="font-medium">{searchData.startDate} <br />to {journeyType === 'roundtrip' ? searchData.endDate : '(One-way)'}</span>
                                        </div>
                                        <div className="flex justify-between pt-2 border-t border-slate-200">
                                            <span className="text-slate-900 font-bold">Total Duration</span>
                                            <span className="font-bold text-primary">{days} Days</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Quote Form */}
                            <div className="lg:col-span-2">
                                <Card className="shadow-lg border-0">
                                    <div className="bg-primary p-6 text-white">
                                        <h2 className="text-xl font-bold">Finalize Quote Request</h2>
                                        <p className="text-primary-foreground/80 text-sm mt-1">
                                            Provide exact location details for an accurate price quote.
                                        </p>
                                    </div>
                                    <form onSubmit={handleSubmitQuote} className="p-8 space-y-6">

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
                                                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[100px]"
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

                                        <Button variant="primary" type="submit" className="w-full h-12 text-lg font-bold">
                                            Send Quote Request
                                        </Button>
                                    </form>
                                </Card>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- STAGE 3: SUCCESS --- */}
                {step === 'success' && (
                    <div className="max-w-xl mx-auto text-center py-12 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Sent Successfully!</h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Your quote request ID <strong>#REQ-{Math.floor(Math.random() * 10000)}</strong> has been sent to {selectedBus?.agency}.
                        </p>
                        <div className="bg-slate-50 p-6 rounded-xl text-left mb-8 shadow-inner">
                            <h3 className="font-bold text-slate-900 mb-2">Next Steps:</h3>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="bg-primary text-white w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                                    Bus owner reviews your route and dates.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-slate-300 text-slate-600 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                                    You receive a notification with the Price Quote.
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="bg-slate-300 text-slate-600 w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                                    Pay a small advance to Confirm Booking.
                                </li>
                            </ul>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button variant="outline" onClick={() => { setStep('search'); setSelectedBus(null); }}>
                                Request Another Bus
                            </Button>
                            <Button variant="primary" onClick={() => router.push('/')}>
                                Go to Dashboard
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
