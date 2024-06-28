export interface Endpoint {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  path: string
  args: string[]
}

export default {
  hs: {
    search: {
      method: 'GET',
      path: '/search',
      args: ['q', 'country'],
    } as Endpoint,
  },
}
