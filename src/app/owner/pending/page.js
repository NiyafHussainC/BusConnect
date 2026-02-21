import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Clock, CheckCircle, ArrowRight } from "lucide-react";

export default function PendingApproval() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Card className="max-w-lg w-full p-8 text-center border-t-4 border-t-yellow-400">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="w-10 h-10 text-yellow-600" />
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-4">Verification Pending</h1>

                <p className="text-slate-600 mb-8 leading-relaxed">
                    Thank you for registering with BusConnect. Your account is currently under review by our Admin team.
                    This process typically takes <strong>2-24 hours</strong>.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left">
                    <h3 className="font-semibold text-slate-900 mb-4">What happens next?</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600">Admin verifies your Company and GST details.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600">You receive an email approval notification.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-600">Log in to add your buses and start earning.</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3">
                    <Link href="/">
                        <Button variant="outline" className="w-full">
                            Return to Home
                        </Button>
                    </Link>
                    <p className="text-xs text-slate-400">
                        Need help? <a href="#" className="text-primary hover:underline">Contact Support</a>
                    </p>
                </div>
            </Card>
        </div>
    );
}
