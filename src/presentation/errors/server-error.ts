export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal server error')
    this.name = ServerError.name
    this.stack = stack
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('UnauthorizedError')
    this.name = UnauthorizedError.name
  }
}
