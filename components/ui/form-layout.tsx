import * as React from "react";
import { cn } from "@/lib/utils";

const FormLayout = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-4", className)} {...props} />
));
FormLayout.displayName = "FormLayout";

const FormLayoutFieldsets = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-12", className)} {...props} />
));
FormLayoutFieldsets.displayName = "FormLayoutFieldsets";

const FormLayoutFieldset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { description?: string }
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "grid grid-cols-1 gap-x-8 gap-y-10 border-b border-neutral-200 dark:border-neutral-700 pb-12 md:grid-cols-3",
      className,
    )}
    {...props}
  >
    <div>
      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
        {props.title}
      </h2>
      {props.description && (
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {props.description}
        </p>
      )}
    </div>
    <div
      className={
        "grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
      }
    >
      {children}
    </div>
  </div>
));
FormLayoutFieldset.displayName = "FormLayoutFieldset";

const FormLayoutActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mt-6 flex items-center justify-end gap-x-6", className)}
    {...props}
  />
));
FormLayoutActions.displayName = "FormLayoutActions";

export {
  FormLayout,
  FormLayoutFieldsets,
  FormLayoutFieldset,
  FormLayoutActions,
};
