import { z } from 'zod'

export const CountryOfImport = z.enum(['canada', 'usa'])

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
      includeParents: z.boolean().optional(),
    }),
  },
}
