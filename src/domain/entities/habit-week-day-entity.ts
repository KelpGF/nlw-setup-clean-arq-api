export class HabitWeekDayEntity {
  id: string
  habitId: string
  weekDay: number

  constructor (id: string, habitId: string, weekDay: number) {
    this.id = id
    this.habitId = habitId
    this.weekDay = weekDay
  }
}
