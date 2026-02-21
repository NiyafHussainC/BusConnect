"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { User, Sun, Moon, Monitor, LogOut, CheckCircle, Save } from "lucide-react";

export default function SettingsPage() {
    const { user, updateUser, logout } = useAuth();
    const { theme, setTheme } = useTheme();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                mobile: user.mobile || ""
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
                mobile: formData.mobile
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

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-muted">Manage your profile and preferences</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">

                {/* Profile Settings */}
                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                            <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-foreground">Profile Information</h2>
                            <p className="text-sm text-muted">Update your account details</p>
                        </div>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <Input
                                label="Mobile Number"
                                placeholder="+91 98765 43210"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            />
                        </div>

                        <Input
                            label="Email Address"
                            value={formData.email}
                            disabled
                            className="bg-muted/20 text-muted cursor-not-allowed"
                        />

                        <div className="pt-4 flex items-center justify-center gap-3">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className="flex items-center gap-2"
                            >
                                {loading ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
                            </Button>

                            {success && (
                                <span className="text-green-600 flex items-center gap-1 text-sm font-medium animate-in fade-in slide-in-from-left-2">
                                    <CheckCircle className="w-4 h-4" /> Saved Successfully
                                </span>
                            )}
                        </div>
                    </form>
                </Card>

                {/* Theme & Preferences */}
                <Card className="p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground">Appearance</h3>

                        <div className="flex items-center gap-2">
                            {[
                                { id: "light", icon: Sun },
                                { id: "dark", icon: Moon },
                                { id: "system", icon: Monitor }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setTheme(item.id)}
                                    className={`p-2 rounded-lg border transition-all ${theme === item.id
                                        ? "border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                                        : "border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 dark:text-slate-300"
                                        }`}
                                    title={`${item.id.charAt(0).toUpperCase() + item.id.slice(1)} Mode`}
                                >
                                    <item.icon className="w-5 h-5" />
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Sign Out Zone */}
                <div className="pt-2 flex justify-center">
                    <Button
                        variant="outline"
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-900/30 transition-colors"
                    >
                        <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                </div>
            </div>
        </div>
    );
}
