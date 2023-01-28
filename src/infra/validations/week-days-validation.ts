import { WeekDaysValidator } from '@/validations/protocols/week-days-validator'

export class WeekDaysValidation implements WeekDaysValidator {
  isValid (weekDays: number[]): boolean {
    if (weekDays.length > 7) return false
    return weekDays.every(this.isValidNumber)
  }

  private isValidNumber (val: number | string): boolean {
    const weekDay = Number(val)
    if (Number.isNaN(weekDay)) return false
    return weekDay >= 0 && weekDay <= 6
  }
}
