import { ControllerResponse } from '../protocols/dtos'
import { ControllerResponsesCodeEnum } from './controller-responses-codes-enum'

export function success<T> (body: T): ControllerResponse<T> {
  return {
    body,
    code: ControllerResponsesCodeEnum.SUCCESS
  }
}

export function badRequest (error: Error): ControllerResponse<Error> {
  return {
    body: error,
    code: ControllerResponsesCodeEnum.BAD_REQUEST
  }
}
