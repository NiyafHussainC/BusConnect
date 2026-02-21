"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Calendar, CheckCircle, Shield, Star, Users, Briefcase, GraduationCap, Heart, Map, Bus } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Tourist Bus on Highway"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Group Travel, <span className="text-accent">Made Simple.</span>
          </h1>
          <h2 className="text-2xl text-white font-medium mb-6">
            Book the right bus. Partner with trusted owners. Travel stress-free.
          </h2>
          <p className="text-lg text-slate-200 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            BusConnect is a centralized platform designed to simplify group travel by connecting customers with verified tourist bus owners for private and charter-based trips.
          </p>

          {/* Thought / Value Line */}
          <div className="mt-12 inline-block bg-white/10 backdrop-blur-md rounded-full px-8 py-3 border border-white/20">
            <p className="text-white italic">
              “Because organizing group travel should be easy, transparent, and reliable.”
            </p>
          </div>
        </div>
      </section>



      {/* How BusConnect Works */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How BusConnect Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">From request to booking, a fair and transparent process for everyone.</p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-0.5 bg-slate-100 -z-10" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {[
                {
                  title: "1. Create Request",
                  desc: "Select dates, pickup location, and passenger count to submit your trip request.",
                  icon: Map
                },
                {
                  title: "2. Owner Review",
                  desc: "Owners check availability for the requested dates.",
                  icon: Shield
                },
                {
                  title: "3. Receive Quotes",
                  desc: "Get competitive quotes from owners. Updates sent instantly.",
                  icon: Briefcase
                },
                {
                  title: "4. Pay Advance",
                  desc: "First to pay secures the bus! 15-min cooldown for others.",
                  icon: CheckCircle
                },
                {
                  title: "5. Booking Confirmed",
                  desc: "Bus Secured. Other users are notified to choose another bus or date.",
                  icon: Bus
                },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center bg-white p-2">
                  <div className="w-20 h-20 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mb-4 shadow-sm relative z-10">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                      <step.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Tours & Travels - Last Month */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Top Rated Tours & Travels – Last Month</h2>
            <p className="text-slate-600">Recognized for outstanding service and customer satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "GreenLine Travels", city: "Mumbai", rating: "4.9", reviews: "120" },
              { name: "Orange Tours", city: "Hyderabad", rating: "4.8", reviews: "95" },
              { name: "VRL Logistics", city: "Bangalore", rating: "4.8", reviews: "150" },
            ].map((agency, idx) => (
              <Card key={idx} className="p-8 hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
                  Top Rated – Last Month
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">{agency.name}</h3>
                    <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                      <Map className="w-3 h-3" /> {agency.city}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Rating</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="text-lg font-bold text-slate-900">{agency.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Reviews</span>
                    <span className="text-sm font-semibold text-slate-700 mt-1">{agency.reviews} Verified</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Impact & Trust Metrics */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: "500+", label: "Group Trips Facilitated", icon: Map },
              { number: "200+", label: "Verified Bus Partners", icon: Shield },
              { number: "50+", label: "Cities Covered", icon: Users },
              { number: "4.8★", label: "Average Partner Rating", icon: Star },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-default">
                <div className="mb-4 p-4 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{stat.number}</div>
                <div className="text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Trusted Partners Showcase */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Trusted Tours & Travel Partners</h2>
            <p className="text-slate-600">Showing a few of our top-rated partners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Royal Travels", city: "Bangalore", years: "15 Years", rating: "4.8" },
              { name: "Srs Travels", city: "Chennai", years: "20 Years", rating: "4.7" },
              { name: "Orange Tours", city: "Hyderabad", years: "12 Years", rating: "4.9" },
              { name: "VRL Logistics", city: "Hubli", years: "25 Years", rating: "4.8" },
            ].map((agency, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-all border-none shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{agency.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{agency.city}</p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-medium uppercase">Experience</span>
                    <span className="text-sm font-semibold text-slate-700">{agency.years}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-400 font-medium uppercase">Rating</span>
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-900">
                      <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
                      {agency.rating}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose BusConnect */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose BusConnect?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Verified Bus Owners", desc: "Every partner is manually verified by admins.", icon: Shield },
              { title: "Secure Access", desc: "Role-based secure login for all users.", icon: Star },
              { title: "Transparent Booking", desc: "Clear pricing and direct communication.", icon: CheckCircle },
              { title: "Smart Availability", desc: "Calendar-based management prevents overbooking.", icon: Calendar },
              { title: "Rating System", desc: "Honest reviews drive quality service.", icon: Star },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Designed for Every Group Journey</h2>
            <p className="text-slate-400">Whatever the occasion, we have the perfect ride.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: "College Tours", icon: GraduationCap },
              { title: "Weddings", icon: Heart },
              { title: "Corporate", icon: Briefcase },
              { title: "Tourist Groups", icon: Map },
              { title: "Events", icon: Users },
            ].map((useCase, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-default border border-white/5">
                <useCase.icon className="w-10 h-10 text-accent mb-4" />
                <span className="font-medium">{useCase.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
