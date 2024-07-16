import { z } from 'zod'
import schema from './schema.js'

const { dutyskip, hs } = schema

export type DutyskipConfigParams = z.infer<typeof dutyskip.ConfigParams>
export type HsSearchParams = z.infer<typeof hs.SearchParams>
