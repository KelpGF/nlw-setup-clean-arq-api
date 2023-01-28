import { WeekDaysValidator } from '@/validations/protocols/week-days-validator'

export class WeekDaysValidation implements WeekDaysValidator {
  isValid (weekDays: number[]): boolean {
    if (weekDays.length > 7) return false
    if (this.removeDuplicates(weekDays).length < weekDays.length) return false
    return weekDays.every(this.isValidNumber)
  }

  private isValidNumber (weekDay: number): boolean {
    if (!Number.isInteger(weekDay)) return false
    return weekDay >= 0 && weekDay <= 6
  }

  private removeDuplicates (data: number[]) {
    return data.filter((val, idx) => idx === data.indexOf(val))
  }
}
