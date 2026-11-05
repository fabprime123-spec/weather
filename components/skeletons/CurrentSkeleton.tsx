import Card from "../Card"
import Skeleton from "./Skeleton"

export default function CurrentSkeleton() {
  return (
    <Card title="Current Weather" styling="md:pb-4">
      <div className="flex flex-col items-center gap-6 2xl:flex-1 2xl:gap-3 2xl:justify-evenly">
        <div className="flex flex-col gap-4 items-center 2xl:gap-1">
          <Skeleton className="w-30 h-15 2xl:w-24 2xl:h-12" />
          <Skeleton className="size-15 rounded-full 2xl:size-14" />
          <Skeleton className="w-40 h-7 2xl:w-32 2xl:h-5" />
        </div>
        <div className="flex flex-col gap-2 2xl:gap-0.5">
          <p className="text-xl text-center 2xl:text-lg">Local Time :</p>
          <Skeleton className="w-40 h-10 2xl:w-32 2xl:h-8" />
        </div>
        <div className="flex justify-evenly w-full">
          <div className="flex flex-col items-center gap-2 2xl:gap-0 flex-1">
            <p className="text-gray-400 2xl:text-md">Feels</p>
            <Skeleton className="size-6 w-12 2xl:h-4 2xl:w-8" />
          </div>
          <div className="flex flex-col items-center gap-2 2xl:gap-0 flex-1">
            <p className="text-gray-400 2xl:text-md">Humidity</p>
            <Skeleton className="size-6 w-12 2xl:h-4 2xl:w-8" />
          </div>
          <div className="flex flex-col items-center gap-2 2xl:gap-0 flex-1">
            <p className="text-gray-400 2xl:text-md">Wind</p>
            <Skeleton className="size-6 w-12 2xl:h-4 2xl:w-8" />
          </div>
        </div>
      </div>
    </Card>
  )
}
