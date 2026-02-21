import Link from "next/link";
import { Bus, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white">
                                <Bus className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold">BusConnect</span>
                        </div>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Simplifying group travel with premium charter bus rentals. Trusted by thousands of happy travelers.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink icon={Facebook} href="#" />
                            <SocialLink icon={Twitter} href="#" />
                            <SocialLink icon={Instagram} href="#" />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Company</h3>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Careers</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Services</h3>
                        <ul className="space-y-4 text-slate-400">
                            <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
                            <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-accent shrink-0" />
                                <span>123 Startup Street, Tech Hub, Bangalore, India</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-accent shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-accent shrink-0" />
                                <span>support@busconnect.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-slate-500">
                    <p>&copy; {new Date().getFullYear()} BusConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ icon: Icon, href }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
            <Icon className="w-5 h-5 text-white" />
        </a>
    );
}
