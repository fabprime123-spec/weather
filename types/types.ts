import React from "react"

export interface Coordinates {
  name?: string
  latitude: number
  longitude: number
}

export interface Information {
  label: string
  value: string
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export interface MapType {
  value: string
  label: string
}

export interface ColorStop {
  value: number
  color: string
  opacity?: number
}

export type AirQualityLevel = "Good" | "Fair" | "Moderate" | "Poor" | "Very Poor"

export interface Range {
  min: number
  max: number | null
}

export type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3"

export type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>
