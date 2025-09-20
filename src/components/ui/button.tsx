import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background/50 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105",
        link: "text-primary underline-offset-4 hover:underline",
        cosmic: "bg-cosmic text-primary-foreground hover:opacity-90 hover:scale-105 glow-cosmic",
        electric: "bg-electric text-secondary-foreground hover:opacity-90 hover:scale-105 glow-electric",
        success: "bg-success text-accent-foreground hover:opacity-90 hover:scale-105",
        glass: "glass-card hover:glass-card-hover text-foreground hover-lift",
        glow: "bg-primary text-primary-foreground hover:bg-primary/90 pulse-glow hover-glow magnetic-hover",
        animated: "animated-border bg-background text-foreground hover:scale-110 transition-transform duration-500",
        shimmer: "bg-gradient-to-r from-primary via-primary-glow to-primary bg-[length:200%_100%] text-primary-foreground shimmer-effect hover:animate-shimmer hover:scale-105",
        morph: "bg-gradient-to-br from-secondary via-primary to-accent text-primary-foreground morph-blob hover:scale-110 transition-all duration-700",
        magnetic: "bg-primary text-primary-foreground magnetic-hover hover:shadow-2xl",
        wave: "bg-accent text-accent-foreground hover:animate-wave hover:scale-105",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
