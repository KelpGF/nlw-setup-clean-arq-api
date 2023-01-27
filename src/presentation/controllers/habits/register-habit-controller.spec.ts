import { mockCreateHabitParams } from '@/domain/tests/mock-habit'
import { mockCreateHabit } from '@/presentation/tests/mock-habit'
import { CreateHabitController } from './register-habit-controller'
import { ControllerRequest, CreateHabit, CreateHabitParams } from './register-habit-controller-protocols'

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
  test('Should call CreateHabitUseCase with correct values', async () => {
    const { sut, createHabitStub } = makeSut()
    const createSpy = jest.spyOn(createHabitStub, 'create')
    const controllerRequest = mockControllerRequest()
    await sut.handle(controllerRequest)
    expect(createSpy).toHaveBeenCalledWith(controllerRequest.body)
  })
})
