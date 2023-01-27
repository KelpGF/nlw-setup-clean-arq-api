import { mockCreateHabitParams } from '@/domain/tests/mock-habit'
import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { mockCreateHabit } from '@/presentation/tests/mock-habit'
import { AddHabitController } from './add-habit-controller'
import { badRequest, ControllerRequest, CreateHabit, CreateHabitParams } from './add-habit-controller-protocols'

type SutTypes = {
  sut: AddHabitController
  createHabitStub: CreateHabit
}

const makeSut = (): SutTypes => {
  const createHabitStub = mockCreateHabit()
  const sut = new AddHabitController(createHabitStub)
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

  test('Should return a bad request if no weekDays provided', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ body: { title: 'any_title', weekDays: undefined as unknown as number[] } })
    expect(response).toEqual(badRequest(new MissingParamError('weekDays')))
  })

  test('Should call CreateHabitUseCase with correct values', async () => {
    const { sut, createHabitStub } = makeSut()
    const createSpy = jest.spyOn(createHabitStub, 'create')
    const controllerRequest = mockControllerRequest()
    await sut.handle(controllerRequest)
    expect(createSpy).toHaveBeenCalledWith(controllerRequest.body)
  })
})
