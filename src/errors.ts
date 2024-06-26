export class DutyskipModuleError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'DutyskipModuleError'
  }
}

export class DutyskipApiError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'DutyskipApiError'
  }
}
