"use client"

import { useEffect, useRef } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { type Coordinates } from "../types/types"

const MAPTILER_KEY = "RrieszfpfGzpQRvR4LaF"
const OPENWEATHER_KEY = process.env.NEXT_PUBLIC_API_KEY

export default function Map({
  coordinates,
  onMapClick,
  mapType
}: {
  coordinates: Coordinates
  onMapClick: (latitude: number, longitude: number) => void
  mapType: string
}) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markerRef = useRef<maplibregl.Marker | null>(null)

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return

    const { latitude, longitude } = coordinates

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/basic-v2-dark/style.json?key=${MAPTILER_KEY}`,
      center: [longitude, latitude],
      zoom: 4,
      attributionControl: false
    })

    mapRef.current = map

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl(), "top-left")

    // Handle clicks to select location
    map.on("click", (e) => {
      onMapClick(e.lngLat.lat, e.lngLat.lng)
    })

    // Cleanup on unmount
    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // 2. Handle Coordinates updates (pin drop & map panning)
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const { latitude, longitude } = coordinates

    // Animate map center flight
    map.flyTo({
      center: [longitude, latitude],
      zoom: map.getZoom(),
      speed: 1.2,
      essential: true
    })

    // Update marker position
    if (markerRef.current) {
      markerRef.current.setLngLat([longitude, latitude])
    } else {
      const el = document.createElement("div")
      el.className = "custom-marker"
      el.style.width = "20px"
      el.style.height = "20px"
      el.style.borderRadius = "50%"
      el.style.backgroundColor = "#6366f1"
      el.style.border = "3px solid #ffffff"
      el.style.boxShadow = "0 0 10px rgba(99, 102, 241, 0.8)"

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([longitude, latitude])
        .addTo(map)

      markerRef.current = marker
    }
  }, [coordinates])

  // 3. Handle MapType overlays (OpenWeather maps layers)
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const updateLayer = () => {
      // Remove layer if already exists
      if (map.getLayer("weather-layer")) {
        map.removeLayer("weather-layer")
      }
      if (map.getSource("weather-layer-source")) {
        map.removeSource("weather-layer-source")
      }

      // Add new OpenWeather overlay layer
      map.addSource("weather-layer-source", {
        type: "raster",
        tiles: [
          `https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${OPENWEATHER_KEY}`
        ],
        tileSize: 256
      })

      map.addLayer({
        id: "weather-layer",
        type: "raster",
        source: "weather-layer-source",
        paint: {
          "raster-opacity": mapType === "clouds_new" ? 0.35 : 0.7
        }
      })
    }

    // Ensure style is loaded before adding source/layer
    if (map.isStyleLoaded()) {
      updateLayer()
    } else {
      map.once("style.load", updateLayer)
    }
  }, [mapType])

  return (
    <div className="w-full h-full relative overflow-hidden rounded-[1rem]">
      <div ref={mapContainer} className="w-full h-full min-h-[300px] saturate-0" />
    </div>
  )
}
