import Card from "../Card"
import Skeleton from "./Skeleton"

export default function DailySkeleton() {
  return (
    <Card title="Daily Forecast">
      <div className="flex flex-col gap-4 md:mt-5 2xl:flex-1 2xl:gap-2 2xl:mt-2 2xl:justify-between">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="flex justify-between px-4 2xl:px-1 items-center">
            <Skeleton className="w-10 h-5 2xl:w-8 2xl:h-4" />
            <Skeleton className="size-8 rounded-full 2xl:size-6" />
            <Skeleton className="w-12 h-5 2xl:w-10 2xl:h-4" />
            <Skeleton className="w-10 h-5 2xl:w-8 2xl:h-4" />
            <Skeleton className="w-10 h-5 2xl:w-8 2xl:h-4" />
          </div>
        ))}
      </div>
    </Card>
  )
}
