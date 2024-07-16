import HttpClient from './HttpClient.js'
import endpoints from './endpoints.js'
export interface DutyskipConfigParams {
  protocol?: string
  host?: string
}

export interface HsSearchParams {
  q: string
  country: string
  includeParents?: boolean
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
    search: async (hsSearchParams: HsSearchParams): Promise<any> => await this.httpClient.makeRequest(endpoints.hs.search, { params: hsSearchParams }),
  }
}

export default Dutyskip
