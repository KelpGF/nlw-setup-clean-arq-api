import { mockFindHabitByIdRepository, mockInsertHabitRepository } from '@/data/tests/mock-habit'
import { mockCreateHabitParams, mockHabitModel } from '@/domain/tests/mock-habit'
import { InsertHabitRepository, FindHabitByIdRepository } from './db-create-habit-protocols'
import { DbCreateHabit } from './db-create-habit'

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
  test('Should call InsertHabitRepository with correct values', async () => {
    const { sut, insertHabitRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(insertHabitRepositoryStub, 'insert')
    const createHabitParams = mockCreateHabitParams()
    await sut.create(createHabitParams)
    expect(createSpy).toHaveBeenCalledWith(createHabitParams)
  })

  test('Should throw if InsertHabitRepository throws', async () => {
    const { sut, insertHabitRepositoryStub } = makeSut()
    jest.spyOn(insertHabitRepositoryStub, 'insert').mockRejectedValueOnce(new Error())
    const promise = sut.create(mockCreateHabitParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call FindHabitByIdRepository with correct id', async () => {
    const { sut, findHabitByIdRepositoryStub } = makeSut()
    const findByIdSpy = jest.spyOn(findHabitByIdRepositoryStub, 'findById')
    await sut.create(mockCreateHabitParams())
    expect(findByIdSpy).toHaveBeenCalledWith(mockHabitModel().id)
  })
})
