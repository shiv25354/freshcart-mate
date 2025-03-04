
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glassy: "backdrop-blur-sm bg-white/20 border border-white/30 text-foreground shadow-md hover:bg-white/30 transition-all duration-300",
        basket: "backdrop-blur-sm bg-white/20 border border-white/30 text-foreground shadow-md hover:bg-white/30 transition-all duration-300 overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        auto: "h-auto",
      },
      animation: {
        none: "",
        slide: "animate-slide-up",
        fade: "animate-fade-in",
        scale: "animate-scale-in",
        float: "animate-float",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "none",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, animation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, animation, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Add a custom BasketButton component
export interface BasketButtonProps extends ButtonProps {
  isOpen?: boolean
  count?: number
  total?: string | number
}

const BasketButton = React.forwardRef<HTMLButtonElement, BasketButtonProps>(
  ({ children, isOpen = false, count, total, className, ...props }, ref) => {
    return (
      <Button 
        ref={ref}
        variant="basket"
        size="auto"
        className={cn(
          "group py-2 px-4 relative",
          isOpen ? "w-auto" : "w-auto",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {children}
          
          {count !== undefined && (
            <span className={cn(
              "ml-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full h-5 min-w-5 flex items-center justify-center transition-all duration-300",
              isOpen ? "opacity-100" : "opacity-100"
            )}>
              {count}
            </span>
          )}

          {isOpen && total !== undefined && (
            <div className={cn(
              "flex items-center transition-all duration-500",
              isOpen ? "opacity-100 translate-y-0 animate-slide-right" : "opacity-0 translate-x-4"
            )}>
              <div className="card-container ml-2 bg-white/30 backdrop-blur-md rounded-md px-3 py-1.5 shadow-sm border border-white/40 animate-scale-in">
                <span className="text-sm font-medium">${typeof total === 'number' ? total.toFixed(2) : total}</span>
              </div>
            </div>
          )}
        </div>
      </Button>
    )
  }
)
BasketButton.displayName = "BasketButton"

export { Button, BasketButton, buttonVariants }
