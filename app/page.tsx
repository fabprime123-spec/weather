"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { useQuery } from "@tanstack/react-query"
import { getCoordinates } from "../lib/api"
import { type Coordinates } from "../types/types"

// Skeletons
import CurrentSkeleton from "../components/skeletons/CurrentSkeleton"
import DailySkeleton from "../components/skeletons/DailySkeleton"
import HourlySkeleton from "../components/skeletons/HourlySkeleton"
import InfoSkeleton from "../components/skeletons/InfoSkeleton"

// Components
import CurrentWeather from "../components/CurrentWeather"
import DailyForecast from "../components/DailyForecast"
import HourlyForecast from "../components/HourlyForecast"
import Information from "../components/Information"
import MapLegend from "../components/MapLegend"
import LocationDropdown from "../components/LocationDropdown"
import MapDropdown from "../components/MapDropdown"
import SidePanel from "../components/SidePanel"
import MobileHeader from "../components/MobileHeader"
import PixelSnow from "../components/PixelSnow"

import { Globe, Layers, Menu } from "lucide-react"

// Dynamically import WebGL MapLibre component to avoid SSR errors
const MapComponent = dynamic(() => import("../components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[300px] bg-slate-950/40 rounded-[1rem] flex items-center justify-center border border-white/5 animate-pulse">
      <span className="text-sm font-medium text-gray-500">Loading Map Engine...</span>
    </div>
  )
})

export default function Home() {
  const [coordinates, setCoordinates] = useState<Coordinates>({ latitude: 40.7128, longitude: -74.006 })
  const [location, setLocation] = useState<string>("Paris")
  const [mapType, setMapType] = useState<string>("precipitation_new")
  const [sidePanelOpen, setSidePanelOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(1024)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Geocode location names using search API
  const { data: geoCodeData } = useQuery({
    queryKey: ["location", location],
    queryFn: () => getCoordinates(location),
    enabled: location !== "custom",
  })

  // Set selected location coordinates
  const target: Coordinates = location === "custom"
    ? coordinates
    : {
        latitude: geoCodeData?.latitude ?? coordinates.latitude,
        longitude: geoCodeData?.longitude ?? coordinates.longitude,
        name: geoCodeData?.name || location,
      }

  function onMapClick(latitude: number, longitude: number) {
    setCoordinates({ latitude, longitude })
    setLocation("custom")
  }

  return (
    <>
      {/* 3D ThreeJS shader pixel snow overlay */}
      <PixelSnow
        color="#c7d2fe"
        flakeSize={0.01}
        minFlakeSize={0.3}
        pixelResolution={1200}
        speed={0.8}
        density={0.08}
        direction={135}
        brightness={0.35}
        depthFade={12}
        farPlane={25}
        gamma={0.5}
        variant="snowflake"
        className="fixed inset-0 z-40 pointer-events-none"
      />

      {/* Mobile Top Navigation Header */}
      <MobileHeader setSidePanelOpen={setSidePanelOpen} />

      {/* Main Grid Page Wrapper */}
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 select-none w-full lg:w-[calc(100dvw-var(--width-sidebar))] min-h-screen overflow-x-hidden">
        
        {/* Dropdowns / Navigation Actions row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-[100] border-b border-white/5 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 min-w-[7rem]">
              <Globe className="size-5 text-indigo-300" />
              <h1 className="text-lg font-bold tracking-wide text-gray-200">Location</h1>
            </div>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 min-w-[7rem]">
              <Layers className="size-5 text-pink-300" />
              <h1 className="text-lg font-bold tracking-wide text-gray-200">Weather Maps</h1>
            </div>
            <MapDropdown mapType={mapType} setMapType={setMapType} />
          </div>

          {windowWidth < 1024 && windowWidth >= 500 && (
            <button
              onClick={() => setSidePanelOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
            >
              <Menu className="size-5 text-white" />
              <span>Pollution Details</span>
            </button>
          )}
        </div>

        {/* Dashboard Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-4 gap-6 flex-1">
          
          {/* WebGL Vector Map Card */}
          <div className="relative h-[350px] md:h-[450px] col-span-1 md:col-span-2 2xl:col-span-4 rounded-[1.2rem] border border-white/10 shadow-2xl overflow-hidden group">
            <MapComponent coordinates={target} onMapClick={onMapClick} mapType={mapType} />
            <MapLegend mapType={mapType} />
          </div>

          {/* Current Weather Widget */}
          <div className="col-span-1 2xl:col-span-1">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coordinates={target} />
            </Suspense>
          </div>

          {/* Daily Forecast List Widget */}
          <div className="col-span-1 2xl:col-span-1">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coordinates={target} />
            </Suspense>
          </div>

          {/* Hourly Forecast Scroll Widget */}
          <div className="col-span-1 md:col-span-2 2xl:col-span-2">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coordinates={target} />
            </Suspense>
          </div>

          {/* Additional Weather Attributes Grid */}
          <div className="col-span-1 md:col-span-2 2xl:col-span-4">
            <Suspense fallback={<InfoSkeleton />}>
              <Information coordinates={target} />
            </Suspense>
          </div>

        </div>
      </div>

      {/* Side Slide-Out Air Quality Panel */}
      <SidePanel
        coordinates={target}
        sidePanelOpen={sidePanelOpen}
        setSidePanelOpen={setSidePanelOpen}
      />
    </>
  )
}
