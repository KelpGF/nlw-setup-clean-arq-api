import { WeekDaysValidator } from '@/validations/protocols/week-days-validator'

export class WeekDaysValidation implements WeekDaysValidator {
  isValid (weekDays: number[]): boolean {
    if (weekDays.length > 7) return false
    return !weekDays.some(this.isInvalidNumber)
  }

  private isInvalidNumber (val: number | string): boolean {
    const weekDay = Number(val)
    if (Number.isNaN(weekDay)) return true
    return !(weekDay >= 0 && weekDay <= 6)
  }
}
