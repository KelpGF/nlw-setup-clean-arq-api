import { HabitEntity } from '@/domain/entities/habit-entity'

export interface FindHabitByIdRepository {
  findById: (habitId: string) => Promise<HabitEntity>
}
