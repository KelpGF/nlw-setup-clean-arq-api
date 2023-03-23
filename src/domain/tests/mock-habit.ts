
import { CreateHabitModel, HabitModel } from '@/domain/models/habits'
import { CreateHabitDTO } from '@/domain/dtos/habit-dto'
import { HabitEntity } from '../entities/habit-entity'

export const mockCreateHabitModel = (): CreateHabitModel => ({
  title: 'any_habit_title',
  weekDays: [1, '3']
})
export const mockHabitModel = (): HabitModel => Object.assign({}, mockCreateHabitDTO(), { id: 'any_habit_id', createdAt: new Date() })
export const mockCreateHabitDTO = (): CreateHabitDTO => new CreateHabitDTO('any_habit_title', [1, 3])
export const mockHabitEntity = (): HabitEntity => new HabitEntity(
  'any_habit_id',
  'any_habit_title',
  [
    { id: 'any_id', habitId: 'any_habit_id', weekDay: 1 },
    { id: 'any_other_id', habitId: 'any_habit_id', weekDay: 3 }
  ],
  new Date()
)
