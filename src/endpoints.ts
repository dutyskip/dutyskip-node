export interface Endpoint {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  path: string
  type: string
}

export default {
  hs: {
    search: {
      method: 'GET',
      path: '/search',
      type: 'HsSearchParams',
    } as Endpoint,
  },
}
