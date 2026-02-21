import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { User, Bus } from "lucide-react";

export default function LoginSelection() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back to BusConnect</h1>
                    <p className="text-slate-500">Choose your account type to continue</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* User Login */}
                    <Link href="/login/customer" className="group block h-full">
                        <Card className="p-8 h-full border-2 border-transparent hover:border-orange-500 transition-all cursor-pointer hover:shadow-xl relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <User className="w-24 h-24 text-orange-500" />
                            </div>
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                                <User className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">I want to Book a Bus</h2>
                            <p className="text-slate-500 mb-6 flex-grow">Login to request and book buses for group trips, events, and private travel.</p>
                            <Button className="w-full group-hover:bg-orange-600 mt-auto">User Login</Button>
                        </Card>
                    </Link>

                    {/* Bus Owner Login */}
                    <Link href="/login/owner" className="group block h-full">
                        <Card className="p-8 h-full border-2 border-transparent hover:border-blue-600 transition-all cursor-pointer hover:shadow-xl relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Bus className="w-24 h-24 text-blue-600" />
                            </div>
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <Bus className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">I am a Bus Owner</h2>
                            <p className="text-slate-500 mb-6 flex-grow">Login to manage your buses, receive trip requests, send quotes, and handle bookings.</p>
                            <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 mt-auto">Owner Login</Button>
                        </Card>
                    </Link>
                </div>

                <div className="text-center mt-12">
                    <p className="text-slate-500 text-sm">
                        Don't have an account? <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">Sign up here</Link>
                    </p>


                    {/* Admin Login Link */}
                    <div className="mt-8 pt-8 border-t border-slate-200 max-w-sm mx-auto">
                        <Link href="/admin/login" className="text-sm text-slate-400 hover:text-indigo-600 transition-colors">
                            Are you an administrator? Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
