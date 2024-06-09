import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  traillingAddOn?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, traillingAddOn, ...props }, ref) => {
    return (
      <div className={"relative"}>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            traillingAddOn ? "pr-10" : null,
            className,
          )}
          ref={ref}
          {...props}
        />
        {traillingAddOn && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm">{traillingAddOn}</span>
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
