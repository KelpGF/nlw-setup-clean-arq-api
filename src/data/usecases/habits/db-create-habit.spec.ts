import { mockFindHabitByIdRepository, mockInsertHabitRepository } from '@/data/tests/mock-habit'
import { mockCreateHabitDTO, mockHabitEntity } from '@/domain/tests/mock-habit'
import { InsertHabitRepository, FindHabitByIdRepository } from './db-create-habit-protocols'
import { DbCreateHabit } from './db-create-habit'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbCreateHabit
  insertHabitRepositoryStub: InsertHabitRepository
  findHabitByIdRepositoryStub: FindHabitByIdRepository
}

const makeSut = (): SutTypes => {
  const insertHabitRepositoryStub = mockInsertHabitRepository()
  const findHabitByIdRepositoryStub = mockFindHabitByIdRepository()
  const sut = new DbCreateHabit(insertHabitRepositoryStub, findHabitByIdRepositoryStub)

  return { sut, insertHabitRepositoryStub, findHabitByIdRepositoryStub }
}

describe('DbCreateHabit UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call InsertHabitRepository with correct values', async () => {
    const { sut, insertHabitRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(insertHabitRepositoryStub, 'insert')
    const createHabitDTO = mockCreateHabitDTO()
    await sut.execute(createHabitDTO)
    expect(createSpy).toHaveBeenCalledWith(createHabitDTO)
  })

  test('Should throw if InsertHabitRepository throws', async () => {
    const { sut, insertHabitRepositoryStub } = makeSut()
    jest.spyOn(insertHabitRepositoryStub, 'insert').mockRejectedValueOnce(new Error())
    const promise = sut.execute(mockCreateHabitDTO())
    await expect(promise).rejects.toThrow()
  })

  test('Should call FindHabitByIdRepository with correct id', async () => {
    const { sut, findHabitByIdRepositoryStub } = makeSut()
    const findByIdSpy = jest.spyOn(findHabitByIdRepositoryStub, 'findById')
    await sut.execute(mockCreateHabitDTO())
    expect(findByIdSpy).toHaveBeenCalledWith(mockHabitEntity().id)
  })

  test('Should throw if FindHabitByIdRepository throws', async () => {
    const { sut, findHabitByIdRepositoryStub } = makeSut()
    jest.spyOn(findHabitByIdRepositoryStub, 'findById').mockRejectedValueOnce(new Error())
    const promise = sut.execute(mockCreateHabitDTO())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a Habit Entity on success', async () => {
    const { sut } = makeSut()
    const habit = await sut.execute(mockCreateHabitDTO())
    expect(habit).toEqual(mockHabitEntity())
  })
})
