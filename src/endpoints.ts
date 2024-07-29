export type EndpointMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'
export type EndpointType = 'hs'
export type EndpointSchema = 'SearchParams'

export interface Endpoint {
  method: EndpointMethod
  path: string
  type: EndpointType
  schema: EndpointSchema
}

export default {
  hs: {
    /**
     * @see {@link https://docs.dutyskip.com/api/reference/search DutySkip Docs - API Reference - Search}
     */
    search: {
      method: 'GET',
      path: '/search',
      type: 'hs',
      schema: 'SearchParams',
    } as Endpoint,
  },
}
