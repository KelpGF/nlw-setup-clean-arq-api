import { ControllerRequest, ControllerResponse } from './dtos'

export type ControllerBody<B> = B | Error | null

export interface Controller<T> {
  handle: (request: ControllerRequest) => Promise<ControllerResponse<ControllerBody<T>>>
}
