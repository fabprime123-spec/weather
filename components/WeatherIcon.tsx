import clsx from "clsx"

export default function WeatherIcon({ src, className }: { src: string; className?: string }) {
  return (
    <img
      className={clsx("size-8 aspect-square filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]", className)}
      src={`https://openweathermap.org/img/wn/${src}.png`}
      alt="Weather Icon"
    />
  )
}
