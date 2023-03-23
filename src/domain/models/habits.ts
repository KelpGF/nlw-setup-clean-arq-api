export interface HabitModel {
  id: string
  title: string
  weekDays: number[]
  created_at: Date
}

export type CreateHabitModel = {
  title: string
  weekDays: Array<number | string>
}
