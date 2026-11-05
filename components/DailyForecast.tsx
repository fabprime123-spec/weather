"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../lib/api"
import Card from "./Card"
import WeatherIcon from "./WeatherIcon"
import { type Coordinates } from "../types/types"

export default function DailyForecast({ coordinates }: { coordinates: Coordinates }) {
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
    <Card title="Daily Forecast">
      <div className="flex flex-col gap-3 animate-fade-in md:mt-3 2xl:flex-1 2xl:gap-1.5 2xl:mt-1 2xl:justify-between">
        {weatherData.daily.map((day) => (
          <div key={day.dt} className="flex justify-between px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors duration-200 2xl:px-1 2xl:py-1 items-center">
            <p className="w-10 text-sm font-semibold tracking-wide 2xl:w-8 2xl:text-xs">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: "short" })}
            </p>
            <WeatherIcon src={day.weather[0].icon} className="size-8 2xl:size-6" />
            <p className="min-w-14 text-sm font-semibold text-right 2xl:min-w-10 2xl:text-xs">
              {Math.round(day.temp.day)}°C
            </p>
            <p className="text-gray-400 text-sm text-right min-w-14 2xl:min-w-10 2xl:text-xs">
              {Math.round(day.temp.min)}°C
            </p>
            <p className="text-indigo-200 text-sm text-right min-w-14 2xl:min-w-10 2xl:text-xs">
              {Math.round(day.temp.max)}°C
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}
