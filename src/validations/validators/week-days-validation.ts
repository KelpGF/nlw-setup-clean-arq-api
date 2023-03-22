import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { Validation } from '@/presentation/protocols/validation'
import { WeekDaysValidator } from '@/validations/protocols/week-days-validator'

export class WeekDaysValidation implements Validation {
  constructor (private readonly weekDaysValidator: WeekDaysValidator, private readonly fieldName: string) {}

  validate (input: Record<any, number[]>): Error | null {
    const error = new InvalidParamError(this.fieldName)
    try {
      const isValid = this.weekDaysValidator.isValid(input[this.fieldName])
      return isValid ? null : error
    } catch {
      return error
    }
  }
}
