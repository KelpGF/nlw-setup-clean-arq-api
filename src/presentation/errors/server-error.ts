export class ServerError extends Error {
  constructor (errorStack: string) {
    super('Server Error')
    this.message = 'ServerError'
    this.stack = errorStack
  }
}
