import { ServerError } from '@/presentation/errors/server-error'
import { Controller } from '@/presentation/protocols/controller'
import { ControllerResponsesCodeEnum } from './controller-responses-codes-enum'

export function success<T> (body: T): Controller.Response<T> {
  return {
    body,
    code: ControllerResponsesCodeEnum.SUCCESS
  }
}

export function badRequest (error: Error): Controller.Response<Error> {
  return {
    body: error,
    code: ControllerResponsesCodeEnum.BAD_REQUEST
  }
}

export function serverError (error: Error): Controller.Response<Error> {
  return {
    body: new ServerError(String(error.stack)),
    code: ControllerResponsesCodeEnum.BAD_REQUEST
  }
}
