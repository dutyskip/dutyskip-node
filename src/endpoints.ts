export interface Endpoint {
  method: 'CREATE' | 'GET' | 'PUT' | 'DELETE'
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
