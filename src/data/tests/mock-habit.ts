import { CreateHabitParams } from '@/domain/usecases/habits/create-habit'
import { InsertHabitRepository } from '@/data/protocols/db/habit/insert-habit-repository'
import { FindHabitByIdRepository } from '@/data/protocols/db/habit/find-habit-by-id-repository'
import { HabitModel } from '@/domain/models/habits'
import { mockHabitModel } from '@/domain/tests/mock-habit'

export const mockInsertHabitRepository = (): InsertHabitRepository => {
  class InsertHabitRepositoryStub implements InsertHabitRepository {
    async insert (insertHabitParams: CreateHabitParams): Promise<string> {
      return 'any_habit_id'
    }
  }

  return new InsertHabitRepositoryStub()
}

export const mockFindHabitByIdRepository = (): FindHabitByIdRepository => {
  class FindHabitByIdRepositoryStub implements FindHabitByIdRepository {
    async findById (habitId: string): Promise<HabitModel> {
      return mockHabitModel()
    }
  }

  return new FindHabitByIdRepositoryStub()
}
