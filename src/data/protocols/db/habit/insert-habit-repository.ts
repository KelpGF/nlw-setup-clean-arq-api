import { CreateHabitDTO } from '@/domain/dtos/habit-dto'

export interface InsertHabitRepository {
  insert: (insertHabitParams: CreateHabitDTO) => Promise<string>
}
