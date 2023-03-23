import { CreateHabitParams } from '@/domain/usecases/habits/create-habit'
import { CreateHabitModel, HabitModel } from '@/domain/models/habits'

export const mockCreateHabitModel = (): CreateHabitModel => ({
  title: 'any_habit_title',
  weekDays: [1, '3']
})

export const mockCreateHabitParams = (): CreateHabitParams => ({
  title: 'any_habit_title',
  weekDays: [1, 3]
})

export const mockHabitModel = (): HabitModel => Object.assign({}, mockCreateHabitParams(), { id: 'any_habit_id', created_at: new Date() })
