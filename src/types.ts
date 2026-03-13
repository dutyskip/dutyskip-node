import { z } from 'zod'
import schema, { CountryOfImport } from './schema.js'

export type DutyskipConfigParams = z.infer<typeof schema.dutyskip.ConfigParams>
export type HsSearchParams = z.infer<typeof schema.hs.SearchParams>
export type CountryOfImport = z.infer<typeof CountryOfImport>

export interface HsSearchItemPga {
  agency: string
  program: string
}

export interface HsSearchItem {
  code: string
  line?: number
  hsCategory?: string
  description: string
  subheading: string
  duty: string | 0
  pga: HsSearchItemPga[]
  descriptionPath: string
}

export interface HsSearchResponse {
  numResults: number
  items: HsSearchItem[]
  parents?: HsSearchItem[]
}
