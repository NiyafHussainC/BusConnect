"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Bus, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth(); // Consume Auth Context

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-105">
                            <Bus className="w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">
                            BusConnect
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">


                        {/* Role Based Links */}
                        {!user && (
                            <>

                                <Link href="/login">
                                    <Button variant="ghost" className="text-primary font-semibold border-2 border-primary hover:bg-primary hover:text-white transition-all">Login</Button>
                                </Link>

                            </>
                        )}

                        {user?.role === 'customer' && (
                            <>
                                <div className="flex items-center gap-2 pl-4 border-l-0 border-slate-200">
                                    <span className="text-sm font-medium text-slate-900">Hi, {user.name}</span>
                                </div>
                            </>
                        )}

                        {user?.role === 'owner' && (
                            <>
                                <Link href="/owner/dashboard" className="text-slate-600 hover:text-primary font-medium">
                                    Dashboard
                                </Link>
                                <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                                    <span className="text-sm font-medium text-slate-900">My Agency</span>
                                    <Button variant="ghost" size="sm" onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50">Logout</Button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-slate-100 p-4 absolute w-full">
                    <div className="flex flex-col gap-4">


                        {!user && (
                            <>
                                <Link href="/login" onClick={() => setIsOpen(false)} className="text-slate-600 font-medium py-2">Login</Link>

                            </>
                        )}

                        {user?.role === 'customer' && (
                            <>
                                <span className="text-sm font-bold text-slate-900 px-2 py-2">Hi, {user.name}</span>
                            </>
                        )}

                        {user?.role === 'owner' && (
                            <>
                                <Link href="/owner/dashboard" onClick={() => setIsOpen(false)} className="font-medium text-slate-900">Dashboard</Link>
                                <Button variant="ghost" onClick={logout} className="text-red-500 justify-start px-0">Logout</Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
