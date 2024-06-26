import * as uuid from 'uuid'
import { type Endpoint } from './endpoints.js'
import { DutyskipModuleError, DutyskipApiError } from './errors.js'
import { buildUrl } from './utils.js'
import { DutyskipConfigParams } from './index.js'

class Api {
  apiKey: string
  config: DutyskipConfigParams
  static default: typeof Api
  constructor(apiKey: string, config: DutyskipConfigParams) {
    (this.apiKey = apiKey, this.config = config)
  }

  buildBaseUrl = () => {
    const DEFAULT_PROTOCOL = process.env.DUTYSKIP_DEFAULT_PROTOCOL ?? 'https://'
    const DEFAULT_HOST = process.env.DUTYSKIP_DEFAULT_HOST ?? 'api.dutyskip.com'
    const protocol = this.config?.protocol ?? DEFAULT_PROTOCOL
    const host = this.config?.host ?? DEFAULT_HOST
    return buildUrl(protocol, host)
  }

  checkKey = () => {
    if (!this.apiKey) {
      throw new DutyskipModuleError('API Key is missing.')
    }
    if (!uuid.validate(this.apiKey)) {
      throw new DutyskipModuleError('API Key is not a UUID.')
    }
  }

  makeRequest = async (endpoint: Endpoint, { params, body }: { params?: Record<string, string>, body?: Record<string, string> }): Promise<unknown> => {
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

export default Api
