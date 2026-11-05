import { z } from "zod"

export const pollutionScheme = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  list: z.array(
    z.object({
      main: z.object({
        aqi: z.number(),
      }),
      components: z.object({
        co: z.number(),
        no: z.number(),
        no2: z.number(),
        o3: z.number(),
        so2: z.number(),
        pm2_5: z.number(),
        pm10: z.number(),
        nh3: z.number(),
      }),
      dt: z.number(),
    })
  )
})

export type PollutionData = z.infer<typeof pollutionScheme>
