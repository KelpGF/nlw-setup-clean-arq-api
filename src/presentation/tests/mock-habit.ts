import { CreateHabitDTO } from '@/domain/dtos/habit-dto'
import { HabitEntity } from '@/domain/entities/habit-entity'
import { CreateHabitUseCase } from '@/domain/usecases/habits/create-habit'
import { mockCreateHabitModel, mockHabitEntity } from '@/domain/tests/mock-habit'
import { AddHabitControllerDTO } from '@/presentation/dtos/add-habit-controller-dto'

export const mockCreateHabit = (): CreateHabitUseCase => {
  class CreateHabitUseCaseStub implements CreateHabitUseCase {
    async execute (dto: CreateHabitDTO): Promise<HabitEntity> {
      return mockHabitEntity()
    }
  }

  return new CreateHabitUseCaseStub()
}

export const mockCreateControllerHabitBodyDTO = (): AddHabitControllerDTO.BodyDTO => {
  return new AddHabitControllerDTO.BodyDTO(mockCreateHabitModel())
}
