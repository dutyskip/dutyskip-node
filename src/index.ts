import HttpClient from './HttpClient.js'
import endpoints from './endpoints.js'
import { DutyskipConfigParams, HsSearchParams, HsSearchResponse } from './types.js'

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
    search: async (hsSearchParams: HsSearchParams): Promise<HsSearchResponse> => await this.httpClient.makeRequest(endpoints.hs.search, { params: hsSearchParams }),
  }
}

export default Dutyskip
