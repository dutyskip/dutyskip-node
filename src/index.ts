import * as uuid from 'uuid'

class DutyskipModuleError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'DutyskipModuleError'
  }
}

class DutyskipApiError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'DutyskipApiError'
  }
}

class Dutyskip {
  apiKey: string
  options?: { testmode?: boolean }
  static default: typeof Dutyskip
  constructor(apiKey: string, options?: { testmode?: boolean }) {
    (this.apiKey = apiKey), (this.options = options)
  }

  checkApiKey = () => {
    if (!this.apiKey) {
      throw new DutyskipModuleError('API Key is missing.')
    }
    if (!uuid.validate(this.apiKey)) {
      throw new DutyskipModuleError('API Key is not a UUID.')
    }
  }

  search = async (term: string, country: string): Promise<any> => {
    try {
      this.checkApiKey()
    } catch (error) {
      return error
    }

    try {
      const apiUrl = this.options?.testmode ? 'https://staging-api.dutyskip.com' : 'https://api.dutyskip.com'
      const headers = {
        'x-api-key': this.apiKey,
      }
      const params = new URLSearchParams({
        q: term,
        country,
      })
      const options = {
        method: 'GET',
        headers: headers,
      }

      const response = await fetch(`${apiUrl}/search?${params}`, options) as any
      if (!response.ok) {
        throw new DutyskipApiError(JSON.stringify({ status: response.status, message: (await response.json())?.message }))
      } else {
        return await response.json()
      }
    } catch (error) {
      return error
    }
  }
}

export default Dutyskip
