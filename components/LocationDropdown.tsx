"use client"

import { useState, useRef, useEffect } from "react"
import { locations } from "../data/location"
import { ChevronDown, MapPin } from "lucide-react"

export default function LocationDropdown({
  location,
  setLocation
}: {
  location: string
  setLocation: (loc: string) => void
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

  return (
    <div className="relative z-5000" style={{ scrollbarWidth: "none" }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-4 py-2 w-48 text-sm font-semibold rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer"
      >
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="size-4 text-indigo-300 shrink-0" />
          <span className="truncate capitalize">{location === "custom" ? "Custom Pin" : location}</span>
        </div>
        <ChevronDown className={`size-4 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 max-h-60 overflow-y-auto z-[9999] glass-card border border-white/10 rounded-xl py-1 animate-fade-in shadow-2xl backdrop-blur-2xl scrollbar-none">
          <div className="px-3 py-1.5 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
            Select Location
          </div>
          {locations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => {
                setLocation(loc.name)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${location === loc.name
                ? "bg-indigo-600/30 text-indigo-200 font-bold"
                : "text-white hover:bg-white/10"
                }`}
            >
              {loc.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
