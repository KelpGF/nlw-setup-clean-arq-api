import { Habit } from '@/domain/models/habits'

export type CreateHabitParams = {
  title: string
  weekDays: number[]
}

export interface CreateHabit {
  create: (createHabitParams: CreateHabitParams) => Promise<Habit>
}