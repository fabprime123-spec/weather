import { weatherScheme } from "../types/weather"
import { cityScheme } from "../types/city"
import { pollutionScheme } from "../types/pollution"
import { getWeatherDescription } from "../data/description"

const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export async function getWeather({ latitude, longitude }: { latitude: number; longitude: number }) {
  const url =
    "https://api.open-meteo.com/v1/forecast?" +
    `latitude=${latitude}&longitude=${longitude}` +
    "&current=" +
    [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "pressure_msl",
      "surface_pressure",
      "weather_code",
      "cloud_cover",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m"
    ].join(",") +
    "&hourly=" +
    [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "dew_point_2m",
      "precipitation_probability",
      "rain",
      "showers",
      "snowfall",
      "pressure_msl",
      "surface_pressure",
      "cloud_cover",
      "visibility",
      "evapotranspiration",
      "uv_index",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m"
    ].join(",") +
    "&daily=" +
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "sunrise",
      "sunset",
      "uv_index_max",
      "precipitation_probability_max",
      "rain_sum",
      "showers_sum",
      "snowfall_sum",
      "wind_speed_10m_max",
      "wind_gusts_10m_max"
    ].join(",") +
    "&timezone=auto"

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }

  const data = await response.json()

  // Transform Open-Meteo data to weatherSchema format
  const transformedData = {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    timezone_offset: data.utc_offset_seconds,
    current: {
      dt: Math.floor(new Date(data.current.time).getTime() / 1000),
      sunrise: Math.floor(new Date(data.daily.sunrise[0]).getTime() / 1000),
      sunset: Math.floor(new Date(data.daily.sunset[0]).getTime() / 1000),
      temp: data.current.temperature_2m,
      feels_like: data.current.apparent_temperature,
      pressure: data.current.pressure_msl,
      humidity: data.current.relative_humidity_2m,
      dew_point: 0, // Not available from Open-Meteo current
      uvi: 0, // Not available from Open-Meteo current
      clouds: data.current.cloud_cover,
      visibility: 10000, // Default value
      wind_speed: data.current.wind_speed_10m,
      wind_deg: data.current.wind_direction_10m,
      wind_gust: data.current.wind_gusts_10m || 0,
      weather: [getWeatherDescription(data.current.weather_code)]
    },
    hourly: data.hourly.time.map((time: string, index: number) => ({
      dt: Math.floor(new Date(time).getTime() / 1000),
      temp: data.hourly.temperature_2m[index],
      feels_like: data.hourly.apparent_temperature[index],
      pressure: data.hourly.pressure_msl[index],
      humidity: data.hourly.relative_humidity_2m[index],
      dew_point: data.hourly.dew_point_2m[index],
      uvi: data.hourly.uv_index[index],
      clouds: data.hourly.cloud_cover[index],
      visibility: data.hourly.visibility[index],
      wind_speed: data.hourly.wind_speed_10m[index],
      wind_deg: data.hourly.wind_direction_10m[index],
      wind_gust: data.hourly.wind_gusts_10m[index],
      weather: [getWeatherDescription(data.hourly.weather_code[index])],
      pop: data.hourly.precipitation_probability[index] / 100
    })),
    daily: data.daily.time.map((time: string, index: number) => ({
      dt: Math.floor(new Date(time).getTime() / 1000),
      sunrise: Math.floor(new Date(data.daily.sunrise[index]).getTime() / 1000),
      sunset: Math.floor(new Date(data.daily.sunset[index]).getTime() / 1000),
      moonrise: 0, // Not available from Open-Meteo
      moonset: 0, // Not available from Open-Meteo
      moon_phase: 0, // Not available from Open-Meteo
      summary: getWeatherDescription(data.daily.weather_code[index]).description,
      temp: {
        day: data.daily.temperature_2m_max[index],
        min: data.daily.temperature_2m_min[index],
        max: data.daily.temperature_2m_max[index],
        night: data.daily.temperature_2m_min[index],
        eve: (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2,
        morn: (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2
      },
      feels_like: {
        day: data.daily.apparent_temperature_max[index],
        night: data.daily.apparent_temperature_min[index],
        eve: (data.daily.apparent_temperature_max[index] + data.daily.apparent_temperature_min[index]) / 2,
        morn: (data.daily.apparent_temperature_max[index] + data.daily.apparent_temperature_min[index]) / 2
      },
      pressure: 1013, // Not available from Open-Meteo daily
      humidity: 0, // Not available from Open-Meteo daily
      dew_point: 0, // Not available from Open-Meteo daily
      wind_speed: data.daily.wind_speed_10m_max[index],
      wind_deg: 0, // Not available from Open-Meteo daily
      wind_gust: data.daily.wind_gusts_10m_max[index],
      weather: [getWeatherDescription(data.daily.weather_code[index])],
      clouds: 0, // Not available from Open-Meteo daily
      pop: (data.daily.precipitation_probability_max[index] || 0) / 100,
      rain: data.daily.rain_sum[index] || 0,
      uvi: data.daily.uv_index_max[index] || 0
    }))
  }

  const parsed = weatherScheme.safeParse(transformedData)
  if (!parsed.success) {
    console.error("Zod Weather Schema Error:", parsed.error)
    throw new Error("Weather data parsing failed")
  }

  return parsed
}

export async function getCoordinates(city?: string) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city!)}&count=1&language=en&format=json`
  )

  if (!response.ok) throw new Error("Failed to fetch coordinates")

  const data = await response.json()
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found")
  }
  const parsed = cityScheme.safeParse(data.results[0])
  if (!parsed.success) {
    console.error("Zod City Schema Error:", parsed.error)
    throw new Error("City data parsing failed")
  }
  return parsed.data
}

export async function airPollution({ latitude, longitude }: { latitude: number; longitude: number }) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )

  if (!response.ok) throw new Error("Failed to fetch air pollution data")

  const data = await response.json()
  const parsed = pollutionScheme.safeParse(data)
  if (!parsed.success) {
    console.error("Zod Pollution Schema Error:", parsed.error)
    throw new Error("Pollution data parsing failed")
  }
  return parsed.data
}
