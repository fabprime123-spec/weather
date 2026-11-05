"use client"

import { AlignJustify } from "lucide-react"

export default function MobileHeader({
  setSidePanelOpen
}: {
  setSidePanelOpen: (open: boolean) => void
}) {
  return (
    <div className="w-full h-14 px-4 flex items-center justify-between bg-slate-950/40 border-b border-white/5 text-right sticky top-0 z-[1000] backdrop-blur-md 500:hidden">
      <span className="font-bold tracking-wider text-sm bg-gradient-to-r from-indigo-200 to-pink-200 bg-clip-text text-transparent">
        METEO GLASS
      </span>
      <button
        onClick={() => setSidePanelOpen(true)}
        className="p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 active:scale-95 transition-all cursor-pointer"
      >
        <AlignJustify className="size-6 text-white" />
      </button>
    </div>
  )
}
