"use client"

import { mapTypeData } from "../data/mapdata"

export default function MapLegend({ mapType }: { mapType: string }) {
  const data = mapTypeData[mapType]
  if (!data) return null

  const maxValue = data.stops[data.stops.length - 1].value
  const gradientStops = data.stops
    .map((stop) => `${stop.color} ${maxValue > 0 ? (stop.value / maxValue) * 100 : 0}%`)
    .join(", ")

  return (
    <div className="absolute top-4 right-4 w-80 max-md:w-48 rounded-2xl shadow-xl p-4  border border-white/10 backdrop-blur-sm animate-fade-in">
      <h3 className="text-sm font-bold text-gray-200 mb-2 max-lg:text-xs">
        {data.title}
      </h3>
      <div
        style={{ background: `linear-gradient(to right, ${gradientStops})` }}
        className="w-full rounded-full border border-white/10 h-3 flex flex-row justify-evenly items-center text-white/50 text-[6px] overflow-hidden"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index}>|</span>
        ))}
      </div>
      <div className="w-full flex justify-between mt-1.5 text-xs text-gray-400">
        <span>
          {data.stops[0].value} {data.unit}
        </span>
        <span>
          {data.stops[data.stops.length - 1].value} {data.unit}
        </span>
      </div>
    </div>
  )
}
