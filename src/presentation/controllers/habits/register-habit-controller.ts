import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { HabitModel, CreateHabit, CreateHabitParams, success, Controller, ControllerRequest, badRequest } from './register-habit-controller-protocols'

export class CreateHabitController implements Controller<HabitModel> {
  constructor (private readonly createHabit: CreateHabit) {}

  async handle (request: ControllerRequest<CreateHabitParams>) {
    const title = request.body?.title
    if (!title) return badRequest(new MissingParamError('title'))

    const habit = await this.createHabit.create(request.body as CreateHabitParams)
    return success<HabitModel>(habit)
  }
}
