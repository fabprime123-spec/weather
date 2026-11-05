import {
  Cloud,
  Sun,
  Compass,
  Gauge,
  Sunrise,
  Sunset
} from "lucide-react"

export function information() {
  return [
    {
      label: "Cloudiness (%)",
      value: "clouds",
      Icon: Cloud
    },
    {
      label: "UV Index",
      value: "uvi",
      Icon: Sun
    },
    {
      label: "Wind Direction",
      value: "wind_deg",
      Icon: Compass
    },
    {
      label: "Pressure (hPa)",
      value: "pressure",
      Icon: Gauge
    },
    {
      label: "Sunrise",
      value: "sunrise",
      Icon: Sunrise
    },
    {
      label: "Sunset",
      value: "sunset",
      Icon: Sunset
    },
  ]
}
