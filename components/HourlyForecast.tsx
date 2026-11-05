"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../lib/api"
import Card from "./Card"
import WeatherIcon from "./WeatherIcon"
import { type Coordinates } from "../types/types"
import { Fragment, useState, type UIEvent } from "react"

export default function HourlyForecast({ coordinates }: { coordinates: Coordinates }) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coordinates],
    queryFn: () =>
      getWeather({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }),
  })

  const weatherData = data.data!
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
    const maxScroll = scrollWidth - clientWidth

    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100)
    }
  }

  return (
    <Card title="Hourly Forecast" styling="relative pb-6">
      <div
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto animate-fade-in 2xl:flex-1 items-center py-2"
        style={{ scrollbarWidth: "none" }}
      >
        {weatherData.hourly.map((hour) => (
          <div
            key={hour.dt}
            className="flex flex-col gap-2 2xl:gap-0.5 items-center p-3 rounded-xl bg-white/5 border border-white/5 min-w-22 hover:bg-white/10 hover:border-white/10 transition-all duration-300"
          >
            <p className="text-[11px] font-semibold text-gray-400 whitespace-nowrap">
              {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <WeatherIcon src={hour.weather[0].icon} className="size-9" />
            <p className="text-sm font-bold">{Math.round(hour.temp)}°C</p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-4 right-4 h-1 bg-white/10 rounded-full overflow-hidden">
        <span
          className="bg-linear-to-r from-violet-500 via-indigo-500 to-pink-500 rounded-full h-full block transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </Card>
  )
}
