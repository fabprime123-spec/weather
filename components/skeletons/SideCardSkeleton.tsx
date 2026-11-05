import Card from "../Card"
import Skeleton from "./Skeleton"

export default function SideCardSkeleton() {
  const widths = ["w-12", "w-8", "w-16", "w-10", "w-20"]
  
  return (
    <Card styling="flex flex-col gap-2">
      <div className="flex justify-between mb-2">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-16 h-6" />
      </div>
      <Skeleton className="w-full h-1.5" />
      <div className="flex justify-between text-xs my-1">
        <Skeleton className="w-4 h-4" />
        <Skeleton className="w-12 h-4" />
      </div>
      <div className="flex justify-between mt-1">
        {widths.map((width, index) => (
          <Skeleton key={index} className={`${width} h-5`} />
        ))}
      </div>
    </Card>
  )
}
