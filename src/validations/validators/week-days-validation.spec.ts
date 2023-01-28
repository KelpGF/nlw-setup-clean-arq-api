import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
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

  test('Should return a invalid param error if validation fails', () => {
    const { sut, weekDaysValidatorStub } = makeSut()
    jest.spyOn(weekDaysValidatorStub, 'isValid').mockReturnValue(false)
    const error = sut.validate(makeInput())
    expect(error).toEqual(new InvalidParamError('weekDays'))
  })

  test('Should return null if succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate(makeInput())
    expect(error).toBeNull()
  })

  test('Should return a invalid param error if validation throws', () => {
    const { sut, weekDaysValidatorStub } = makeSut()
    jest.spyOn(weekDaysValidatorStub, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const error = sut.validate(makeInput())
    expect(error).toEqual(new InvalidParamError('weekDays'))
  })
})
