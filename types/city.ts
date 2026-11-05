import { z } from "zod"

export const cityScheme = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  elevation: z.number().optional(),
  feature_code: z.string(),
  country_code: z.string(),
  admin1_id: z.number().optional(),
  admin2_id: z.number().optional(),
  timezone: z.string(),
  population: z.number().optional(),
  postcodes: z.array(z.string()).optional(),
  country_id: z.number(),
  country: z.string(),
  admin1: z.string().optional(),
})

export type City = z.infer<typeof cityScheme>
