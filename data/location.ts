export const locations = [
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "New York", latitude: 40.7128, longitude: -74.006 },
  { name: "Seoul", latitude: 37.5665, longitude: 126.9780 },
  { name: "Tokyo", latitude: 35.6762, longitude: 139.6503 },
  { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
  { name: "Bangkok", latitude: 13.7563, longitude: 100.5018 },
  { name: "Dubai", latitude: 25.2048, longitude: 55.2708 },
  { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
  { name: "Barcelona", latitude: 41.3851, longitude: 2.1734 },
  { name: "Berlin", latitude: 52.5200, longitude: 13.4050 },
  { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
  { name: "Moscow", latitude: 55.7558, longitude: 37.6173 },
  { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
  { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
  { name: "Beijing", latitude: 39.9042, longitude: 116.4074 }
]

export function shuffle(array: any[]) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}
