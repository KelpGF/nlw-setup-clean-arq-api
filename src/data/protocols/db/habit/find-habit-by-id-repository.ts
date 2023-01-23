import { HabitModel } from '@/domain/models/habits'

export interface FindHabitByIdRepository {
  findById: (habitId: string) => Promise<HabitModel>
}
