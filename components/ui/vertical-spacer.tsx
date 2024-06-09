import * as React from "react";
import { cn } from "@/lib/utils";

const VerticalSpacer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    withTopMargin?: boolean;
    withBottomPadding?: boolean;
  }
>(({ className, withTopMargin, withBottomPadding, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-6",
      className,
      withTopMargin ? "mt-6" : "",
      withBottomPadding ? "pb-6" : "",
    )}
    {...props}
  />
));
VerticalSpacer.displayName = "VerticalSpacer";

export { VerticalSpacer };
