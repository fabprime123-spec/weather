"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../lib/api"
import Card from "./Card"
import WeatherIcon from "./WeatherIcon"
import { type Coordinates } from "../types/types"

export default function CurrentWeather({ coordinates }: { coordinates: Coordinates }) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coordinates],
    queryFn: () =>
      getWeather({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      }),
  })

  const weatherData = data.data!
  const localTimeStr = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: weatherData.timezone,
  }).format(new Date(weatherData.current.dt * 1000))

  return (
    <Card title="Current Weather" styling="md:pb-4">
      <div className="flex flex-col items-center gap-6 animate-fade-in 2xl:flex-1 2xl:gap-3 2xl:justify-evenly">
        <div className="flex flex-col gap-2 items-center 2xl:gap-1">
          <h2 className="text-6xl font-semibold text-center 2xl:text-5xl">
            {Math.round(weatherData.current.temp)}°C
          </h2>
          <WeatherIcon src={weatherData.current.weather[0].icon} className="size-16" />
          <h3 className="capitalize text-xl text-indigo-200 2xl:text-sm">
            {weatherData.current.weather[0].description}
          </h3>
        </div>

        <div className="flex flex-col gap-1 items-center bg-white/5 border border-white/10 px-6 py-2.5 rounded-2xl backdrop-blur-sm">
          <p className="text-xs tracking-wider uppercase text-gray-400">Local Time</p>
          <h3 className="text-3xl text-center font-bold tracking-tight bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {localTimeStr}
          </h3>
        </div>

        <div className="flex justify-evenly w-full border-t border-white/5 pt-4">
          <div className="flex flex-col items-center gap-1 flex-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Feels</p>
            <p className="font-semibold text-sm">{Math.round(weatherData.current.feels_like)}°C</p>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 border-x border-white/5">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Humidity</p>
            <p className="font-semibold text-sm">{weatherData.current.humidity}%</p>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1">
            <p className="text-gray-400 text-xs uppercase tracking-wider">Wind</p>
            <p className="font-semibold text-sm">{weatherData.current.wind_speed} mph</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
