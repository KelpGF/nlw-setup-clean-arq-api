import { Validation } from '@/presentation/protocols/validation'
import { WeekDaysValidator } from '@/validations/protocols/week-days-validator'

export class WeekDaysValidation implements Validation<Record<any, number[]>> {
  constructor (private readonly weekDaysValidator: WeekDaysValidator, private readonly fieldName: string) {}

  validate (input: Record<any, number[]>): Error | null {
    this.weekDaysValidator.isValid(input[this.fieldName])
    return null
  }
}
