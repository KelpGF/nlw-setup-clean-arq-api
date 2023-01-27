import { HabitModel, CreateHabit, CreateHabitParams, success, Controller, ControllerRequest } from './register-habit-controller-protocols'

export class CreateHabitController implements Controller<HabitModel> {
  constructor (private readonly createHabit: CreateHabit) {}

  async handle (request: ControllerRequest<CreateHabitParams>) {
    const habit = await this.createHabit.create(request.body as CreateHabitParams)
    return success<HabitModel>(habit)
  }
}
