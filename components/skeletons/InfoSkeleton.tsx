import Card from "../Card"
import Skeleton from "./Skeleton"

export default function InfoSkeleton() {
  return (
    <Card title="Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 2xl:flex-1 2xl:gap-x-8 2xl:gap-y-3 2xl:px-1 2xl:content-between">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex gap-4 2xl:gap-2 items-center">
              <Skeleton className="size-8 rounded-full 2xl:size-5" />
              <Skeleton className="w-24 h-5 2xl:w-20 2xl:h-4" />
            </div>
            <Skeleton className="w-12 h-5 2xl:w-10 2xl:h-4" />
          </div>
        ))}
      </div>
    </Card>
  )
}
