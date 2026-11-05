"use client"

import { airPollution } from "../lib/api"
import { type Coordinates, type Pollutant } from "../types/types"
import { airQualityRanges, pollutantNameMapping } from "../data/airQualityRanges"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense, useEffect, useState } from "react"
import Card from "./Card"
import clsx from "clsx"
import { ChevronRight, HelpCircle } from "lucide-react"
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton"

export default function SidePanel({
  coordinates,
  sidePanelOpen,
  setSidePanelOpen
}: {
  coordinates: Coordinates
  sidePanelOpen: boolean
  setSidePanelOpen: (open: boolean) => void
}) {
  return (
    <div
      className={clsx(
        "fixed top-0 right-0 h-screen w-96 max-sm:w-full shadow-2xl glass-panel backdrop-blur-xl border-l border-white/10 z-[1100] py-8 px-6 overflow-y-auto transition-transform duration-300 lg:translate-x-0",
        sidePanelOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{ scrollbarWidth: "none" }}
    >
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPollution coordinates={coordinates} setSidePanelOpen={setSidePanelOpen} />
      </Suspense>
    </div>
  )
}

function AirPollution({
  coordinates,
  setSidePanelOpen
}: {
  coordinates: Coordinates
  setSidePanelOpen: (open: boolean) => void
}) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coordinates],
    queryFn: () => airPollution(coordinates)
  })

  const [windowWidth, setWindowWidth] = useState(1024)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const aqi = data.list[0].main.aqi
  const aqiLabel = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi - 1] || "Unknown"

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Air Quality
        </h1>
        {windowWidth < 1024 && (
          <button
            onClick={() => setSidePanelOpen(false)}
            className="p-1 rounded-lg border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <ChevronRight className="size-6" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-gray-500">AQI Index</span>
          <span className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 to-pink-200 bg-clip-text text-transparent">
            {aqi} - {aqiLabel}
          </span>
        </div>
        <div className="relative group ml-auto">
          <HelpCircle className="size-5 text-gray-400 hover:text-white transition-colors cursor-help" />
          <div className="absolute right-0 bottom-full mb-2 w-64 p-3 rounded-xl bg-slate-950/95 border border-white/10 text-[11px] leading-relaxed text-gray-300 shadow-2xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-[999]">
            Air Quality Index values represent general health impacts:
            <ul className="mt-1 list-disc pl-4 space-y-0.5">
              <li>1 = Good</li>
              <li>2 = Fair</li>
              <li>3 = Moderate</li>
              <li>4 = Poor</li>
              <li>5 = Very Poor</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(data.list[0].components).map(([key, value]) => {
          const rangeKey = key.toUpperCase() as keyof typeof airQualityRanges
          const pollutant = airQualityRanges[rangeKey]
          if (!pollutant) return null

          const max = Math.max(pollutant["Very Poor"].min, value)
          const min = Math.min(pollutant["Good"].min, value)

          const currentLevel = (() => {
            for (const [level, range] of Object.entries(pollutant)) {
              if (value >= range.min && (range.max == null || value < range.max)) {
                return level
              }
            }
            return "Very Poor"
          })()

          const color = (() => {
            switch (currentLevel) {
              case "Good":
                return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
              case "Fair":
                return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
              case "Moderate":
                return "bg-amber-500/20 text-amber-300 border-amber-500/30"
              case "Poor":
                return "bg-rose-500/20 text-rose-300 border-rose-500/30"
              case "Very Poor":
                return "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30"
              default:
                return "bg-gray-500/20 text-gray-300 border-gray-500/30"
            }
          })()

          return (
            <Card key={key} styling="flex flex-col gap-3 group">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-gray-200">{key.toUpperCase()}</span>
                  <div className="relative group/tooltip">
                    <HelpCircle className="size-3.5 text-gray-500 hover:text-gray-300 transition-colors cursor-help" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 w-48 p-2 rounded-lg bg-slate-950 border border-white/10 text-[10px] text-gray-300 shadow-xl opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-200 z-[999] text-center">
                      Concentration of {pollutantNameMapping[rangeKey as Pollutant]}
                    </div>
                  </div>
                </div>
                <span className="text-base font-extrabold text-white">{value}</span>
              </div>

              {/* Glass Slider */}
              <div className="flex flex-col gap-1 mt-1">
                <GlassSlider min={min} max={max} value={value} />
                <div className="flex justify-between text-[10px] text-gray-500 px-0.5">
                  <span>{min}</span>
                  <span>{max}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mt-1.5">
                {Object.keys(pollutant).map((quality) => (
                  <span
                    key={quality}
                    className={clsx(
                      "px-2 py-0.5 rounded-full text-[10px] font-medium border transition-all duration-300",
                      quality === currentLevel
                        ? color
                        : "bg-white/5 text-gray-500 border-transparent"
                    )}
                  >
                    {quality}
                  </span>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function GlassSlider({ min, max, value }: { min: number; max: number; value: number }) {
  const percentage = Math.min(100, Math.max(0, max > min ? ((value - min) / (max - min)) * 100 : 0))
  return (
    <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-visible border border-white/5">
      <div
        className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
        style={{ width: `${percentage}%` }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 size-3 bg-white border-2 border-indigo-400 rounded-full shadow-[0_0_8px_rgba(165,180,252,0.8)] transition-all duration-300"
        style={{ left: `calc(${percentage}% - 6px)` }}
      />
    </div>
  )
}
