import * as uuid from 'uuid'
import { ZodError } from 'zod'
import { type Endpoint } from './endpoints.js'
import { DutyskipModuleError, DutyskipApiError } from './errors.js'
import { buildUrl, parseZodErrorToString } from './utils.js'
import { type DutyskipConfigParams } from './types.js'
import schema from './schema.js'

interface RequestOptions {
  params?: Record<string, any>
  body?: Record<string, string>
}

class HttpClient {
  apiKey: string
  config: DutyskipConfigParams
  static default: typeof HttpClient
  constructor(apiKey: string, config: DutyskipConfigParams) {
    (this.apiKey = apiKey, this.config = config)
  }

  buildBaseUrl(): string {
    const DEFAULT_PROTOCOL = process.env.DUTYSKIP_DEFAULT_PROTOCOL ?? 'https://'
    const DEFAULT_HOST = process.env.DUTYSKIP_DEFAULT_HOST ?? 'api.dutyskip.com'
    const protocol = this.config?.protocol ?? DEFAULT_PROTOCOL
    const host = this.config?.host ?? DEFAULT_HOST
    return buildUrl(protocol, host)
  }

  checkKey(): void {
    if (!this.apiKey) {
      throw new DutyskipModuleError('API Key is missing.')
    }
    if (!uuid.validate(this.apiKey)) {
      throw new DutyskipModuleError('API Key is not a UUID.')
    }
  }

  async makeRequest(endpoint: Endpoint, options?: RequestOptions): Promise<any> {
    const { params, body } = options ?? {}
    this.checkKey()
    const baseUrl = this.buildBaseUrl()

    try {
      const schemaType = schema[endpoint.type]
      schemaType?.[endpoint.schema as keyof typeof schemaType].parse(params)
    } catch (err) {
      if (err instanceof ZodError) {
        const error = `Invalid ${endpoint.schema} - ${parseZodErrorToString(err)}`
        throw new DutyskipModuleError(error)
      }
    }

    const apiUrl = baseUrl + endpoint.path + (params ? `?${new URLSearchParams(params)}` : '')
    const response = await fetch(apiUrl, {
      headers: { 'x-api-key': this.apiKey },
      method: endpoint.method,
      ...(body && { body: JSON.stringify(body) }),
    })
    if (!response.ok) {
      const { message } = await response.json() as { message: unknown } || {}
      const error = JSON.stringify({ status: response.status, message: message || response.statusText })
      throw new DutyskipApiError(error)
    } else {
      return await response.json()
    }
  }
}

export default HttpClient
