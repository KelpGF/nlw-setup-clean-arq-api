import { mockCreateHabitModel, mockCreateHabitParams, mockHabitModel } from '@/domain/tests/mock-habit'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { mockCreateHabit, mockCreateControllerHabitBodyDTO } from '@/presentation/tests/mock-habit'
import { mockValidation } from '@/presentation/tests/mock-validation'
import { AddHabitController } from './add-habit-controller'
import { Validation, CreateHabit, serverError, badRequest, success, AddHabitControllerDTO } from './add-habit-controller-protocols'
import MockDate from 'mockdate'

type SutTypes = {
  sut: AddHabitController
  createHabitStub: CreateHabit
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const createHabitStub = mockCreateHabit()
  const validationStub = mockValidation()
  const sut = new AddHabitController(createHabitStub, validationStub)
  return { sut, createHabitStub, validationStub }
}

const mockControllerRequest = (): AddHabitControllerDTO.Input => ({
  body: mockCreateHabitModel()
})

describe('CreateHabit Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CreateHabitUseCase with correct values', async () => {
    const { sut, createHabitStub } = makeSut()
    const createSpy = jest.spyOn(createHabitStub, 'create')
    await sut.handle(mockControllerRequest())
    expect(createSpy).toHaveBeenCalledWith(mockCreateHabitParams())
  })

  test('Should return a server error if CreateHabitUseCase throws', async () => {
    const { sut, createHabitStub } = makeSut()
    jest.spyOn(createHabitStub, 'create').mockRejectedValueOnce(new Error())
    const response = await sut.handle(mockControllerRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockControllerRequest()
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(mockCreateControllerHabitBodyDTO())
  })

  test('Should return a bad request if Validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(mockControllerRequest())

    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should return a server error if Validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockControllerRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return a success with accessToken on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockControllerRequest())
    expect(httpResponse).toEqual(success(mockHabitModel()))
  })
})
