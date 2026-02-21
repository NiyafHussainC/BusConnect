import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function Card({ children, className, ...props }) {
    return (
        <div
            className={twMerge(clsx("bg-card text-card-foreground rounded-xl shadow-sm border border-border p-6", className))}
            {...props}
        >
            {children}
        </div>
    );
}
