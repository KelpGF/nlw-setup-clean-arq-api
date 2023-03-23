import { Controller, CreateHabitParams, HabitModel } from '@/presentation/controllers/habits/add-habit-controller-protocols'

export namespace AddHabitControllerDto {
  export type Input = Controller.Request<CreateHabitParams>
  export type Output = Promise<Controller.Response<HabitModel | Error>>
}
