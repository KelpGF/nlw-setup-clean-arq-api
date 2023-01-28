import { WeekDaysValidator } from '@/validations/protocols/week-days-validator'
import { WeekDaysValidation } from './week-days-validation'

const mockWeekDaysValidator = (): WeekDaysValidator => {
  class WeekDaysValidatorStub implements WeekDaysValidator {
    isValid (weekDays: number[]): boolean {
      return true
    }
  }
  return new WeekDaysValidatorStub()
}

type SutType = {
  sut: WeekDaysValidation
  weekDaysValidatorStub: WeekDaysValidator
}

const makeSut = (): SutType => {
  const weekDaysValidatorStub = mockWeekDaysValidator()
  const sut = new WeekDaysValidation(weekDaysValidatorStub, 'weekDays')

  return { sut, weekDaysValidatorStub }
}

const makeInput = () => ({ weekDays: [1, 3] })

describe('WeekDays Validation', () => {
  test('Should call WeekDaysValidator with correct value', () => {
    const { sut, weekDaysValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(weekDaysValidatorStub, 'isValid')
    const input = makeInput()
    sut.validate(input)
    expect(isValidSpy).toHaveBeenCalledWith(input.weekDays)
  })
})
