import Api from './Api.js'
import endpoints from './endpoints.js'
export interface DutyskipConfigParams {
  protocol?: string
  host?: string
}

class Dutyskip {
  apiKey: string
  config: DutyskipConfigParams
  api: any
  static default: typeof Dutyskip

  constructor(apiKey: string, config: DutyskipConfigParams = {}) {
    (this.apiKey = apiKey), (this.config = config)
    this.api = new Api(apiKey, config)
  }

  hs = {
    search: async (q: string, country: string): Promise<any> => {
      try {
        return await this.api.makeRequest(endpoints.hs.search, { params: { q, country } })
      } catch (error) {
        return error
      }
    },
  }
}

export default Dutyskip
