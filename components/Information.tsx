"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../lib/api"
import Card from "./Card"
import { type Coordinates } from "../types/types"
import { information } from "../data/information"

export default function Information({ coordinates }: { coordinates: Coordinates }) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coordinates],
    queryFn: () =>
      getWeather({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }),
  })

  const weatherData = data.data!

  return (
    <Card title="Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-4 py-2 animate-fade-in 2xl:flex-1 2xl:gap-x-8 2xl:gap-y-3 2xl:px-1 2xl:content-between">
        {information().map(({ label, value, Icon }) => {
          const rawVal = (weatherData.current as Record<string, any>)[value]
          return (
            <div
              key={value}
              className="flex justify-between items-center p-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-200"
            >
              <div className="flex gap-4 2xl:gap-2 items-center">
                <Icon className="size-6 text-indigo-300 2xl:size-5" />
                <span className="text-gray-300 text-sm 2xl:text-xs">{label}</span>
              </div>
              <span className="text-sm font-semibold 2xl:text-xs">
                <FormatComponent value={value} number={rawVal} />
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset") {
    return (
      <span>
        {new Date(number * 1000).toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })}
      </span>
    )
  }

  if (value === "wind_deg") {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">{number}°</span>
        <span
          className="inline-block transition-transform duration-500 ease-out"
          style={{ transform: `rotate(${number}deg)` }}
        >
          ↑
        </span>
      </div>
    )
  }

  return <span>{number}</span>
}
