export type ControllerRequest<B = any, H = any, P = any> = {
  headers?: H
  body?: B
  params?: P
}

export type ControllerResponse<T> = {
  body: T
  code: number
}
