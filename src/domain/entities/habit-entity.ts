import { HabitModel } from '../models/habits'
import { HabitWeekDayEntity } from './habit-week-day-entity'

export class HabitEntity {
  id: string
  title: string
  weekDays: HabitWeekDayEntity[]
  createdAt: Date

  constructor (id: string, title: string, weekDays: HabitWeekDayEntity[], createdAt: Date) {
    this.id = id
    this.title = title
    this.weekDays = weekDays
    this.createdAt = createdAt
  }

  toModel (): HabitModel {
    return {
      id: this.id,
      title: this.title,
      weekDays: this.weekDays.map(day => day.weekDay),
      createdAt: this.createdAt
    }
  }
}
