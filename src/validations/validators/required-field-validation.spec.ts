import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('any_field')

describe('RequiredField Validation', () => {
  test('Should return a missing param error if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should return null if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ any_field: '' })
    expect(error).toBeNull()
  })
})
