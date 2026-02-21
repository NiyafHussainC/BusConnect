import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Button({
    children,
    variant = 'primary',
    className,
    disabled,
    type = 'button',
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-slate-800 focus:ring-slate-900",
        accent: "bg-accent text-accent-foreground hover:bg-orange-600 focus:ring-orange-500",
        outline: "border-2 border-slate-200 bg-transparent text-slate-900 hover:bg-slate-50 focus:ring-slate-900",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        success: "bg-success text-success-foreground hover:bg-green-600 focus:ring-green-500"
    };

    return (
        <button
            type={type}
            className={twMerge(clsx(baseStyles, variants[variant], className))}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
}
