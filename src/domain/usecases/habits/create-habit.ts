import { CreateHabitDTO } from '@/domain/dtos/habit-dto'
import { HabitEntity } from '@/domain/entities/habit-entity'

export interface CreateHabitUseCase {
  execute: (dto: CreateHabitDTO) => Promise<HabitEntity>
}
