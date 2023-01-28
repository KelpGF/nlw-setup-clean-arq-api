import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { Validation } from '@/presentation/protocols/validation'

export class RequiredFieldValidation implements Validation<Record<any, any>> {
  constructor (private readonly fieldName: string) {}

  validate (input: Record<any, any>): Error | null {
    const error = new MissingParamError(this.fieldName)

    try {
      const isValid = Reflect.has(input, this.fieldName)
      return isValid ? null : error
    } catch {
      return error
    }
  }
}
