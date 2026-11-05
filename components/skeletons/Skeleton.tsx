import clsx from "clsx"

export default function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={clsx("animate-pulse rounded bg-white/10", className)}
      {...props}
    />
  )
}
