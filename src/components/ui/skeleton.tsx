import { cn } from "@/utils/index"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-zinc-100 animate-pulse rounded-md dark:bg-zinc-800", className)}
      {...props}
    />
  )
}

export { Skeleton }
