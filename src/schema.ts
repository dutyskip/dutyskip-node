import { z } from 'zod'

export default {
  dutyskip: {
    ConfigParams: z.object({
      protocol: z.string().optional(),
      host: z.string().optional(),
    }),
  },
  hs: {
    SearchParams: z.object({
      q: z.string(),
      country: z.enum(['canada', 'usa']),
      includeParams: z.boolean().optional(),
    }),
  },
}