import { ZodError } from 'zod'

export function buildUrl(protocol: string, host: string, config?: { port?: string }): string {
  return config?.port ? `${protocol}${host}:${config?.port}` : `${protocol}${host}`
}

export function parseZodErrorToString(err: ZodError) {
  return err.issues.map(issue => `${String(issue.path?.[0])} - ${issue.message}`).join(', ')
}
