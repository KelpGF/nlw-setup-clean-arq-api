import { Validation } from '@/presentation/protocols/validation'
import { mockValidation } from '@/validations/test/mock-validation'
import { ValidationComposite } from './validation-composite'

type SutType = {
  sut: ValidationComposite
  validations: Validation[]
}

const makeSut = (): SutType => {
  const validations = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validations)
  return { sut, validations }
}

describe('ValidationComposite', () => {
  test('Should return null if validation success', () => {
    const { sut } = makeSut()
    const error = sut.validate({ any_field: 'any_value' })
    expect(error).toBeNull()
  })
})