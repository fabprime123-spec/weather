"use client"

import { useState, useRef, useEffect } from "react"
import { map_types } from "../data/maps"
import { ChevronDown, Layers } from "lucide-react"

export default function MapDropdown({
  mapType,
  setMapType
}: {
  mapType: string
  setMapType: (type: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedMap = map_types.find((m) => m.value === mapType) || map_types[0]

  return (
    <div className="relative z-5000" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 w-48 text-sm font-semibold rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer"
      >
        <div className="flex items-center gap-1.5 truncate">
          <Layers className="size-4 text-pink-300 shrink-0" />
          <span className="truncate capitalize">{selectedMap.label}</span>
        </div>
        <ChevronDown className={`size-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 max-h-60 overflow-y-auto z-[9999] glass-card border border-white/10 rounded-xl py-1 animate-fade-in shadow-2xl backdrop-blur-2xl">
          <div className="px-3 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
            Weather Layers
          </div>
          {map_types.map((map) => (
            <button
              key={map.value}
              onClick={() => {
                setMapType(map.value)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${mapType === map.value
                ? "bg-pink-600/30 text-pink-200 font-bold"
                : "text-white hover:bg-white/10"
                }`}
            >
              {map.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
