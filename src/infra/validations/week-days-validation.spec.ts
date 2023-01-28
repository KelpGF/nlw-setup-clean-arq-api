import { WeekDaysValidation } from './week-days-validation'

const makeSut = (): WeekDaysValidation => new WeekDaysValidation()

describe('WeekDays Validation', () => {
  test('Should return false if a invalid weekDay provided', () => {
    const sut = makeSut()
    const isValid = sut.isValid([9, 2])
    expect(isValid).toBe(false)
  })
})
