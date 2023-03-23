import { Controller, CreateHabitModel, HabitModel } from '@/presentation/controllers/habits/add-habit-controller-protocols'

export namespace AddHabitControllerDTO {
  export type Input = Controller.Request<CreateHabitModel>
  export type Output = Promise<Controller.Response<HabitModel | Error>>
  export class BodyDTO implements CreateHabitModel {
    private readonly _title: string
    private readonly _weekDays: Array<number | string>

    constructor (createHabitModel: CreateHabitModel) {
      this._title = createHabitModel.title
      this._weekDays = createHabitModel.weekDays
    }

    get title (): string {
      return this._title
    }

    get weekDays (): number[] {
      return this._weekDays && this._weekDays.map((day) => Number(day)) // eslint-disable-line
    }
  }
}
