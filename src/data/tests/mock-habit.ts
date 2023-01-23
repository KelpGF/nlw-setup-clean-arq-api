import { CreateHabitParams } from '@/domain/usecases/habits/create-habit'
import { InsertHabitRepository } from '@/data/protocols/db/habit/insert-habit-repository'

export const mockInsertHabitRepository = (): InsertHabitRepository => {
  class InsertHabitRepositoryStub implements InsertHabitRepository {
    async insert (insertHabitParams: CreateHabitParams): Promise<void> {}
  }

  return new InsertHabitRepositoryStub()
}
