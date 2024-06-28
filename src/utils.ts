export function buildUrl(protocol: string, host: string, config?: { port?: string }): string {
  return config?.port ? `${protocol}${host}:${config?.port}` : `${protocol}${host}`
}
