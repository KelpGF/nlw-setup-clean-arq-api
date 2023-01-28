import { WeekDaysValidation } from './week-days-validation'

const makeSut = (): WeekDaysValidation => new WeekDaysValidation()

describe('WeekDays Validation', () => {
  test('Should return false if a invalid weekDay provided', () => {
    const sut = makeSut()
    const isValid = sut.isValid([9, 2])
    expect(isValid).toBe(false)
  })

  test('Should return false if a invalid weekDays length', () => {
    const sut = makeSut()
    const isValid = sut.isValid([0, 1, 2, 3, 4, 5, 6, 7])
    expect(isValid).toBe(false)
  })

  test('Should return false if repeat a weekDay', () => {
    const sut = makeSut()
    const isValid = sut.isValid([0, 1, 0])
    expect(isValid).toBe(false)
  })
})
