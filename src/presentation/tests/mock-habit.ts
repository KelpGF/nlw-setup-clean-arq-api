import { HabitModel } from '@/domain/models/habits'
import { mockCreateHabitModel, mockHabitModel } from '@/domain/tests/mock-habit'
import { CreateHabit, CreateHabitParams } from '@/domain/usecases/habits/create-habit'
import { AddHabitControllerDTO } from '../dtos/add-habit-controller-dto'

export const mockCreateHabit = (): CreateHabit => {
  class CreateHabitStub implements CreateHabit {
    async create (createHabitParams: CreateHabitParams): Promise<HabitModel> {
      return mockHabitModel()
    }
  }

  return new CreateHabitStub()
}

export const mockCreateControllerHabitBodyDTO = (): AddHabitControllerDTO.BodyDTO => {
  return new AddHabitControllerDTO.BodyDTO(mockCreateHabitModel())
}
