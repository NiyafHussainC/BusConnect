"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Building2, Lock, CheckCircle, Save, ChevronDown, ChevronUp } from "lucide-react";

export default function OwnerSettingsPage() {
    const { user, updateUser, changePassword } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        company: "",
        mobile: "",
        city: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: ""
    });
    const [pwdLoading, setPwdLoading] = useState(false);
    const [pwdSuccess, setPwdSuccess] = useState(false);
    const [isSecurityExpanded, setIsSecurityExpanded] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                company: user.company || "",
                mobile: user.phone || "",
                city: user.city || "",
            });
        }
    }, [user]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        // Simulate API call
        setTimeout(() => {
            const result = updateUser({
                name: formData.name,
                company: formData.company,
                phone: formData.mobile,
                city: formData.city
            });

            setLoading(false);
            if (result.success) {
                setSuccess(true);
                // Hide success message after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
            } else {
                alert(result.message);
            }
        }, 1000);
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (passwordData.new !== passwordData.confirm) {
            alert("New passwords do not match!");
            return;
        }

        setPwdLoading(true);
        setPwdSuccess(false);

        // Simulate API call
        setTimeout(() => {
            const result = changePassword(passwordData.current, passwordData.new);

            setPwdLoading(false);
            if (result.success) {
                setPwdSuccess(true);
                setPasswordData({ current: "", new: "", confirm: "" });
                // Hide success message after 3 seconds
                setTimeout(() => setPwdSuccess(false), 3000);
            } else {
                alert(result.message);
            }
        }, 1000);
    };

    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Agency Settings</h1>
                <p className="text-slate-500">Manage your agency profile and account security</p>
            </div>

            <div className="grid gap-8">
                {/* Profile Settings */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Agency Information</h2>
                            <p className="text-sm text-slate-500">Update your public agency details</p>
                        </div>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Contact Person Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <Input
                                label="Agency / Company Name"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Contact Number"
                                placeholder="+91 98765 43210"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            />
                            <Input
                                label="Primary Operating City"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>

                        <div className="pt-4 flex items-center justify-start gap-3">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className="flex items-center gap-2"
                            >
                                {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Details</>}
                            </Button>

                            {success && (
                                <span className="text-green-600 flex items-center gap-1 text-sm font-medium animate-in fade-in slide-in-from-left-2">
                                    <CheckCircle className="w-4 h-4" /> Saved Successfully
                                </span>
                            )}
                        </div>
                    </form>
                </Card>

                {/* Security Settings */}
                <Card className="p-6">
                    <div
                        className="flex items-center justify-between mb-4 cursor-pointer group"
                        onClick={() => setIsSecurityExpanded(!isSecurityExpanded)}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center transition-colors group-hover:bg-slate-200">
                                <Lock className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Security</h2>
                                <p className="text-sm text-slate-500">Update your account password</p>
                            </div>
                        </div>
                        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                            {isSecurityExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                    </div>

                    {isSecurityExpanded && (
                        <div className="pt-2 animate-in fade-in slide-in-from-top-4 duration-300">
                            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                <Input
                                    label="Current Password"
                                    type="password"
                                    required
                                    value={passwordData.current}
                                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        label="New Password"
                                        type="password"
                                        required
                                        value={passwordData.new}
                                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                    />
                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        required
                                        value={passwordData.confirm}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4 flex items-center justify-start gap-3">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={pwdLoading || !passwordData.current || !passwordData.new || !passwordData.confirm}
                                        className="flex items-center gap-2"
                                    >
                                        {pwdLoading ? "Updating..." : "Update Password"}
                                    </Button>

                                    {pwdSuccess && (
                                        <span className="text-green-600 flex items-center gap-1 text-sm font-medium animate-in fade-in slide-in-from-left-2">
                                            <CheckCircle className="w-4 h-4" /> Password Updated
                                        </span>
                                    )}
                                </div>
                            </form>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
