import { InsertHabitRepository } from '@/data/protocols/db/habit/insert-habit-repository'
import { FindHabitByIdRepository } from '@/data/protocols/db/habit/find-habit-by-id-repository'
import { mockHabitEntity } from '@/domain/tests/mock-habit'
import { HabitEntity } from '@/domain/entities/habit-entity'
import { CreateHabitDTO } from '../usecases/habits/db-create-habit-protocols'

export const mockInsertHabitRepository = (): InsertHabitRepository => {
  class InsertHabitRepositoryStub implements InsertHabitRepository {
    async insert (insertHabitParams: CreateHabitDTO): Promise<string> {
      return 'any_habit_id'
    }
  }

  return new InsertHabitRepositoryStub()
}

export const mockFindHabitByIdRepository = (): FindHabitByIdRepository => {
  class FindHabitByIdRepositoryStub implements FindHabitByIdRepository {
    async findById (habitId: string): Promise<HabitEntity> {
      return mockHabitEntity()
    }
  }

  return new FindHabitByIdRepositoryStub()
}
