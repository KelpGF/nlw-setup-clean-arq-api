import { CreateHabitParams } from '@/domain/usecases/habits/create-habit'

export interface InsertHabitRepository {
  insert: (insertHabitParams: CreateHabitParams) => Promise<string>
}
