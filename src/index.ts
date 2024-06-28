import HttpClient from './HttpClient.js'
import endpoints from './endpoints.js'
export interface DutyskipConfigParams {
  protocol?: string
  host?: string
}

class Dutyskip {
  apiKey: string
  config: DutyskipConfigParams
  httpClient: HttpClient
  static default: typeof Dutyskip

  constructor(apiKey: string, config: DutyskipConfigParams = {}) {
    (this.apiKey = apiKey), (this.config = config)
    this.httpClient = new HttpClient(apiKey, config)
  }

  hs = {
    search: async (q: string, country: string): Promise<any> => await this.httpClient.makeRequest(endpoints.hs.search, { params: { q, country } }),
  }
}

export default Dutyskip
