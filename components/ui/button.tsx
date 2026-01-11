import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background active:scale-[0.98] transition-transform duration-200 shadow-md",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-blue-900/20 rounded-full",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground rounded-full",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-full",
        ghost: "hover:bg-accent hover:text-accent-foreground shadow-none rounded-full",
        link: "underline-offset-4 hover:underline text-primary shadow-none rounded-full",
        // Specific variants for the dashboard cards
        "dashboard-blue":
          "bg-primary text-primary-foreground relative overflow-hidden shadow-neomorph items-start justify-between flex-col h-full rounded-3xl",
        "dashboard-yellow":
          "bg-secondary text-secondary-foreground relative overflow-hidden shadow-neomorph items-center justify-center flex-col h-full rounded-3xl",
        "dashboard-red":
          "bg-destructive text-destructive-foreground relative overflow-hidden shadow-neomorph items-center justify-center flex-col h-full rounded-3xl",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-24 px-8 text-2xl",
        icon: "h-14 w-14",
        card: "p-6 w-full h-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
