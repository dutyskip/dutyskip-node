import HttpClient from './HttpClient.js'
import endpoints from './endpoints.js'
import { DutyskipConfigParams, HsSearchParams, HsSearchResponse } from './types.js'

class Dutyskip {
  apiKey: string
  config: DutyskipConfigParams
  httpClient: HttpClient
  static default: typeof Dutyskip

  /**
   * Provides access to DutySkip API through methods
   *
   * @param apiKey - {@link https://docs.dutyskip.com/api/authentication#api-keys DutySkip API} Key generated in your account settings.
   * @param config - DutySkip API config parameters.
   * @param config.protocol - config parameter to change the API url protocol.
   * @param config.host - config parameter to change the API url host.
   * @see {@link https://docs.dutyskip.com/api/authentication#api-keys DutySkip Docs - API Keys}
   */
  constructor(apiKey: string, config: DutyskipConfigParams = {}) {
    (this.apiKey = apiKey), (this.config = config)
    this.httpClient = new HttpClient(apiKey, config)
  }
  /**
   * DutySkip API - HS Classification methods
   */

  hs = {
  /**
   * Returns HS classification and PGA requirements for searched product or HS Code.
   *
   * @param search - Search parameters.
   * @param search.q - Search query term.
   * @param search.country - Search country.
   * @param search.includeParents - Includes search result parents.
   * @returns The item number of results, items, and parent items.
   *
   * @see {@link https://docs.dutyskip.com/api/reference/search DutySkip Docs - API Reference - Search}
   */
    search: async (search: {
      q: string
      country: 'canada' | 'usa'
      includeParents?: boolean | undefined
    }): Promise<HsSearchResponse> => await this.httpClient.makeRequest(endpoints.hs.search, { params: search as HsSearchParams }),
  }
}

export default Dutyskip
