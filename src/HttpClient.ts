import * as uuid from 'uuid'
import { type Endpoint } from './endpoints.js'
import { DutyskipModuleError, DutyskipApiError } from './errors.js'
import { buildUrl } from './utils.js'
import { DutyskipConfigParams } from './index.js'

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

  async makeRequest(endpoint: Endpoint, options?: RequestOptions): Promise<unknown> {
    const { params, body } = options ?? {}
    this.checkKey()
    const baseUrl = this.buildBaseUrl()
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
