export class CreateHabitDTO {
  title: string
  weekDays: number[]

  constructor (title: string, weekDays: number[]) {
    this.title = title
    this.weekDays = weekDays
  }
}
