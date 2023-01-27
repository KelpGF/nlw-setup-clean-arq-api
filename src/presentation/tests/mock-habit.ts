import { HabitModel } from '@/domain/models/habits'
import { mockHabitModel } from '@/domain/tests/mock-habit'
import { CreateHabit, CreateHabitParams } from '@/domain/usecases/habits/create-habit'

export const mockCreateHabit = (): CreateHabit => {
  class CreateHabitStub implements CreateHabit {
    async create (createHabitParams: CreateHabitParams): Promise<HabitModel> {
      return mockHabitModel()
    }
  }

  return new CreateHabitStub()
}
