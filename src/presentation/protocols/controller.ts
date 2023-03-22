export interface Controller {
  handle: (request: Controller.Request) => Promise<Controller.Response>
}

export namespace Controller {
  export type Request<B = any, P = any, H = any> = {
    body?: B
    params?: P
    headers?: H
  }
  export type Response<T = any> = {
    body?: T
    code: number
  }
}
