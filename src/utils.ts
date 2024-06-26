export function buildUrl(protocol: string, host: string, config?: { port?: string }) {
  return config?.port ? `${protocol}${host}:${config?.port}` : `${protocol}${host}`
}
