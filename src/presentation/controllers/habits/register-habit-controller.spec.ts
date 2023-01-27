import { mockCreateHabitParams } from '@/domain/tests/mock-habit'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { mockCreateHabit } from '@/presentation/tests/mock-habit'
import { CreateHabitController } from './register-habit-controller'
import { badRequest, ControllerRequest, CreateHabit, CreateHabitParams } from './register-habit-controller-protocols'

type SutTypes = {
  sut: CreateHabitController
  createHabitStub: CreateHabit
}

const makeSut = (): SutTypes => {
  const createHabitStub = mockCreateHabit()
  const sut = new CreateHabitController(createHabitStub)
  return { sut, createHabitStub }
}

const mockControllerRequest = (): ControllerRequest<CreateHabitParams> => ({
  body: mockCreateHabitParams()
})

describe('CreateHabit Controller', () => {
  test('Should return a bad request if no title provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(badRequest(new MissingParamError('title')))
  })

  test('Should call CreateHabitUseCase with correct values', async () => {
    const { sut, createHabitStub } = makeSut()
    const createSpy = jest.spyOn(createHabitStub, 'create')
    const controllerRequest = mockControllerRequest()
    await sut.handle(controllerRequest)
    expect(createSpy).toHaveBeenCalledWith(controllerRequest.body)
  })
})
