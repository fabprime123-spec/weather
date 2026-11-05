import Card from "../Card"
import Skeleton from "./Skeleton"

export default function HourlySkeleton() {
  return (
    <Card title="Hourly Forecast">
      <div className="flex gap-4 overflow-x-hidden 2xl:flex-1 items-center py-2">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2 2xl:gap-1 items-center p-2 min-w-22 border-r border-white/5">
            <Skeleton className="w-16 h-5" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="w-10 h-5" />
          </div>
        ))}
      </div>
    </Card>
  )
}
