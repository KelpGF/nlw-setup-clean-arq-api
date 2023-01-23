import { InsertHabitRepository } from '@/data/protocols/db/habit/insert-habit-repository'
import { CreateHabitParams } from '@/domain/usecases/habits/create-habit'
import { DbCreateHabit } from './db-create-habit'

describe('DbCreateHabit UseCase', () => {
  test('Should call InsertHabitRepository with correct values', async () => {
    class InsertHabitRepositoryStub implements InsertHabitRepository {
      async insert (insertHabitParams: CreateHabitParams): Promise<void> {}
    }

    const insertHabitRepositoryStub = new InsertHabitRepositoryStub()
    const sut = new DbCreateHabit(insertHabitRepositoryStub)
    const createSpy = jest.spyOn(insertHabitRepositoryStub, 'insert')
    const mockCreateHabitParams = (): CreateHabitParams => ({
      title: 'any_habit_title',
      weekDays: [1]
    })
    await sut.create(mockCreateHabitParams())
    expect(createSpy).toHaveBeenCalledWith(mockCreateHabitParams())
  })
})
