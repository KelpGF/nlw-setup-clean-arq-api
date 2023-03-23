export interface HabitModel {
  id: string
  title: string
  weekDays: number[]
  createdAt: Date
}

export type CreateHabitModel = {
  title: string
  weekDays: Array<number | string>
}
