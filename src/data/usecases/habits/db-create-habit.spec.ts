import { InsertHabitRepository } from '@/data/protocols/db/habit/insert-habit-repository'
import { mockInsertHabitRepository } from '@/data/tests/mock-habit'
import { mockCreateHabitParams } from '@/domain/tests/mock-habit'
import { DbCreateHabit } from './db-create-habit'

type SutTypes = {
  sut: DbCreateHabit
  insertHabitRepositoryStub: InsertHabitRepository
}

const makeSut = (): SutTypes => {
  const insertHabitRepositoryStub = mockInsertHabitRepository()
  const sut = new DbCreateHabit(insertHabitRepositoryStub)

  return { sut, insertHabitRepositoryStub }
}

describe('DbCreateHabit UseCase', () => {
  test('Should call InsertHabitRepository with correct values', async () => {
    const { sut, insertHabitRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(insertHabitRepositoryStub, 'insert')
    const createHabitParams = mockCreateHabitParams()
    await sut.create(createHabitParams)
    expect(createSpy).toHaveBeenCalledWith(createHabitParams)
  })
})
