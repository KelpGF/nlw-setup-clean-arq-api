import { WeekDaysValidator } from '@/validations/protocols/week-days-validator'

export class WeekDaysValidation implements WeekDaysValidator {
  isValid (weekDays: number[]): boolean {
    return !weekDays.some(this.isInvalidNumber)
  }

  private isInvalidNumber (val: number | string): boolean {
    const weekDay = Number(val)
    if (Number.isNaN(weekDay)) return true
    return !(weekDay >= 0 && weekDay <= 6)
  }
}
