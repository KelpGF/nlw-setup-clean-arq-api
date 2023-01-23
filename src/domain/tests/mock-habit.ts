import { CreateHabitParams } from '@/domain/usecases/habits/create-habit'

export const mockCreateHabitParams = (): CreateHabitParams => ({
  title: 'any_habit_title',
  weekDays: [1]
})
