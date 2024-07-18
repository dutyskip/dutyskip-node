import { z } from 'zod'
import schema from './schema.js'

const { dutyskip, hs } = schema

export type DutyskipConfigParams = z.infer<typeof dutyskip.ConfigParams>
export type HsSearchParams = z.infer<typeof hs.SearchParams>

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
