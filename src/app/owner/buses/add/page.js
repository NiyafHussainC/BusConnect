"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input, Select } from "@/components/ui/Input";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";

export default function AddBus() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        plateNumber: "",
        busType: "",
        seats: "",
        layout: "",
        amenities: [],
        ac: false
    });
    const [errors, setErrors] = useState({});

    const busTypes = [
        { value: "mini", label: "Mini Bus" },
        { value: "30seater", label: "30 Seater" },
        { value: "40seater", label: "40 Seater" },
        { value: "luxury", label: "Luxury Coach" },
    ];

    const amenitiesList = [
        "Music System", "Charging Ports", "Wi-Fi", "Pushback Seats", "TV / LED", "Luggage Space"
    ];

    const validate = () => {
        let newErrors = {};
        const seats = parseInt(formData.seats);

        if (!formData.plateNumber) newErrors.plateNumber = "Plate number is required";

        // Seat Verification Logic
        if (formData.busType === "mini") {
            if (seats < 15 || seats > 25) newErrors.seats = "Mini Bus must have 15-25 seats";
        } else if (formData.busType === "30seater") {
            if (seats !== 30) newErrors.seats = "30 Seater must have exactly 30 seats";
        } else if (formData.busType === "40seater") {
            if (seats !== 40) newErrors.seats = "40 Seater must have exactly 40 seats";
        } else if (formData.busType === "luxury") {
            if (seats < 30) newErrors.seats = "Luxury Coach must have at least 30 seats";
        }

        if (!formData.layout) newErrors.layout = "Please select a layout";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                router.push("/owner/buses");
            }, 1500);
        }
    };

    const handleAmenityChange = (amenity) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Add New Bus</h1>
                <p className="text-slate-500">Register a new vehicle to your fleet.</p>
            </div>

            <Card className="p-8 border-t-4 border-t-primary shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Section 1: Basic Info */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Vehicle Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Bus Plate Number"
                                placeholder="KA-01-AB-1234"
                                value={formData.plateNumber}
                                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value.toUpperCase() })}
                                error={errors.plateNumber}
                            />
                            <Select
                                label="Bus Type"
                                options={[{ value: "", label: "Select Type" }, ...busTypes]}
                                value={formData.busType}
                                onChange={(e) => setFormData({ ...formData, busType: e.target.value })}
                                error={errors.busType}
                                required
                            />
                        </div>
                    </div>

                    {/* Section 2: Seating Config */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Seating Configuration</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Input
                                    label="Total Seating Capacity"
                                    type="number"
                                    placeholder="e.g. 30"
                                    value={formData.seats}
                                    onChange={(e) => setFormData({ ...formData, seats: e.target.value })}
                                    error={errors.seats}
                                />
                                {/* Real-time Hint */}
                                {formData.busType && (
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" />
                                        {formData.busType === 'mini' ? 'Range: 15-25 seats' :
                                            formData.busType === '30seater' ? 'Exact: 30 seats' :
                                                formData.busType === '40seater' ? 'Exact: 40 seats' : 'Min: 30 seats'}
                                    </p>
                                )}
                            </div>
                            <Select
                                label="Seat Layout"
                                options={[
                                    { value: "", label: "Select Layout" },
                                    { value: "2x2", label: "2x2 (Standard)" },
                                    { value: "2x3", label: "2x3 (High Capacity)" },
                                    { value: "3x2", label: "3x2 (High Capacity)" },
                                    { value: "1x1", label: "1x1 (Sleeper)" },
                                    { value: "2x1", label: "2x1 (Sleeper)" }
                                ]}
                                value={formData.layout}
                                onChange={(e) => setFormData({ ...formData, layout: e.target.value })}
                                error={errors.layout}
                            />
                        </div>
                    </div>

                    {/* Section 3: Amenities & Features */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Features & Amenities</h3>

                        {/* AC Toggle */}
                        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                            <div>
                                <span className="font-medium text-slate-900 block">Air Conditioning (AC)</span>
                                <span className="text-sm text-slate-500">Is this an AC bus?</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={formData.ac}
                                    onChange={(e) => setFormData({ ...formData, ac: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {/* Checkboxes */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {amenitiesList.map((amenity) => (
                                <label key={amenity} className={`
                    flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all
                    ${formData.amenities.includes(amenity) ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 hover:border-slate-300'}
                 `}>
                                    <input
                                        type="checkbox"
                                        className="rounded border-slate-300 text-primary focus:ring-primary"
                                        checked={formData.amenities.includes(amenity)}
                                        onChange={() => handleAmenityChange(amenity)}
                                    />
                                    <span className="text-sm font-medium">{amenity}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Section 4: Images */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-slate-900 border-b border-slate-100 pb-2">Bus Photos</h3>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                            <Upload className="w-10 h-10 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-600 font-medium">Click to upload bus images</p>
                            <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                            {loading ? "Registering Bus..." : "Submit for Approval"}
                        </Button>
                    </div>

                </form>
            </Card>
        </div>
    );
}
