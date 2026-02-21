import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Input({ label, className, error, ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-foreground mb-1.5">
                    {label}
                </label>
            )}
            <input
                className={twMerge(
                    clsx(
                        "w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all",
                        error && "border-red-500 focus:border-red-500 focus:ring-red-200",
                        className
                    )
                )}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}

export function Select({ label, className, options = [], error, ...props }) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-foreground mb-1.5">
                    {label}
                </label>
            )}
            <div className="relative">
                <select
                    className={twMerge(
                        clsx(
                            "appearance-none w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-ring transition-all",
                            error && "border-red-500 focus:border-red-500",
                            className
                        )
                    )}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}
