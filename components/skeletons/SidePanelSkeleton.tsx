import SideCardSkeleton from "./SideCardSkeleton"
import Skeleton from "./Skeleton"

export default function SidePanelSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <div className="flex items-center gap-2">
        <Skeleton className="w-48 h-10" />
      </div>
      {Array.from({ length: 4 }).map((_, index) => (
        <SideCardSkeleton key={index} />
      ))}
    </div>
  )
}
