import { cn } from '@/utils/index';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2  whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: `
          bg-primary-500 text-primary-foreground shadow-xs 
          hover:bg-primary-600 hover:text-primary-foreground 
          active:bg-primary-700 
          disabled:bg-primary-200 disabled:text-primary-400 
          dark:bg-primary-600 dark:text-primary-foreground
          dark:hover:bg-primary-500 dark:hover:text-primary-foreground
        `,
        destructive: `
          bg-destructive text-white shadow-xs 
          hover:bg-destructive/90 hover:text-white
          disabled:bg-destructive/60 disabled:text-white/50
          dark:bg-destructive dark:text-white
          dark:hover:bg-destructive/80 dark:hover:text-white
        `,
        outline: `
          border border-primary-500 bg-primary-50 shadow-xs 
          hover:bg-primary-100 hover:text-primary-700 
          dark:border-primary-400 dark:bg-primary-800 dark:text-primary-50
          dark:hover:bg-primary-700 dark:hover:text-primary-50
        `,
        secondary: `
          bg-neutral-100 text-neutral-500 shadow-xs 
          hover:bg-neutral-200 hover:text-neutral-600 
          active:bg-neutral-300 active:text-neutral-700
          dark:bg-neutral-800 dark:text-neutral-400
          dark:hover:bg-neutral-700 dark:hover:text-neutral-300
          dark:active:bg-neutral-600 dark:active:text-neutral-200
        `,
        ghost: `
          bg-transparent text-primary-500 shadow-none
          hover:bg-primary-50 hover:text-primary-600
          dark:bg-transparent dark:text-primary-400
          dark:hover:bg-primary-900/40
        `,
        link: `
          text-primary-600 underline-offset-4 hover:underline 
          dark:text-primary-400
        `,
      },
      size: {
        default: 'h-9 px-4 py-2 rounded-md',
        sm: 'h-8 px-3 py-1.5 text-sm rounded-md',
        lg: 'h-10 px-5 py-2.5 text-base rounded-lg',
        icon: 'p-2 h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
