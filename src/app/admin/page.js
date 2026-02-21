import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
                    <p className="text-slate-500">System status and user metrics.</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    Download Reports
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Users", value: "1,240", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Pending Verifications", value: "8", icon: AlertCircle, color: "text-orange-500", bg: "bg-orange-50" },
                    { label: "Active Subscriptions", value: "85", icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
                    { label: "Monthly Revenue", value: "₹2.4L", icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-50" },
                ].map((stat, idx) => (
                    <Card key={idx} className="p-6 border-0 shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                    </Card>
                ))}
            </div>

            {/* Verification Queue */}
            <Card className="border-0 shadow-md">
                <h3 className="font-bold text-lg text-slate-900 mb-6">Pending Bus Owner Verifications</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-4 py-3">Applicant Name</th>
                                <th className="px-4 py-3">Business Name</th>
                                <th className="px-4 py-3">Date Applied</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { name: "Suresh Kevin", bus: "Kevin Travels", date: "Jan 25, 2026" },
                                { name: "Anita Raj", bus: "Royal Coaches", date: "Jan 26, 2026" },
                                { name: "Mohammed Z.", bus: "Z-Lines", date: "Jan 27, 2026" },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.bus}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.date}</td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <Button variant="success" size="sm" className="py-1 px-3 h-8 text-xs bg-green-600 hover:bg-green-700">Approve</Button>
                                        <Button variant="outline" size="sm" className="py-1 px-3 h-8 text-xs text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
