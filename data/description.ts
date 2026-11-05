// Weather code to OpenWeather-like description mapping
export function getWeatherDescription(code: number) {
  const descriptions: Record<number, { id: number; main: string; description: string; icon: string }> = {
    0: { id: 800, main: "Clear", description: "clear sky", icon: "01d" },
    1: { id: 801, main: "Clouds", description: "few clouds", icon: "02d" },
    2: { id: 802, main: "Clouds", description: "scattered clouds", icon: "03d" },
    3: { id: 803, main: "Clouds", description: "overcast clouds", icon: "04d" },
    45: { id: 741, main: "Fog", description: "foggy", icon: "50d" },
    48: { id: 741, main: "Fog", description: "depositing rime fog", icon: "50d" },
    51: { id: 300, main: "Drizzle", description: "light drizzle", icon: "09d" },
    53: { id: 301, main: "Drizzle", description: "moderate drizzle", icon: "09d" },
    55: { id: 302, main: "Drizzle", description: "dense drizzle", icon: "09d" },
    61: { id: 500, main: "Rain", description: "slight rain", icon: "10d" },
    63: { id: 501, main: "Rain", description: "moderate rain", icon: "10d" },
    65: { id: 502, main: "Rain", description: "heavy rain", icon: "10d" },
    71: { id: 600, main: "Snow", description: "slight snow", icon: "13d" },
    73: { id: 601, main: "Snow", description: "moderate snow", icon: "13d" },
    75: { id: 602, main: "Snow", description: "heavy snow", icon: "13d" },
    77: { id: 613, main: "Snow", description: "snow grains", icon: "13d" },
    80: { id: 520, main: "Rain", description: "slight rain showers", icon: "10d" },
    81: { id: 521, main: "Rain", description: "moderate rain showers", icon: "10d" },
    82: { id: 522, main: "Rain", description: "violent rain showers", icon: "10d" },
    85: { id: 620, main: "Snow", description: "slight snow showers", icon: "13d" },
    86: { id: 622, main: "Snow", description: "heavy snow showers", icon: "13d" },
    95: { id: 200, main: "Thunderstorm", description: "thunderstorm", icon: "11d" },
    96: { id: 201, main: "Thunderstorm", description: "thunderstorm with slight hail", icon: "11d" },
    99: { id: 202, main: "Thunderstorm", description: "thunderstorm with heavy hail", icon: "11d" },
  }
  return descriptions[code] || { id: 0, main: "Unknown", description: "unknown", icon: "01d" }
}
