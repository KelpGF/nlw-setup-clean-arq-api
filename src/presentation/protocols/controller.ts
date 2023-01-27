export interface Controller<T> {
  handle: (request: Controller.Request) => Promise<Controller.Response<T | Error | null>>
}

export namespace Controller {
  export type Request<B = any, P = any, H = any> = {
    body?: B
    params?: P
    headers?: H
  }
  export type Response<T> = {
    body: T
    code: number
  }
}
