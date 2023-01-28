import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { Validation } from '@/presentation/protocols/validation'

export class RequiredFieldValidation implements Validation<Record<string, any>> {
  constructor (private readonly fieldName: string) {}

  validate (input: Record<string, any>): Error | null {
    return !Reflect.has(input, this.fieldName) ? new MissingParamError(this.fieldName) : null
  }
}
