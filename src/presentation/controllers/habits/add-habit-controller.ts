import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { HabitModel, CreateHabit, CreateHabitParams, success, Controller, ControllerRequest, badRequest } from './add-habit-controller-protocols'

export class AddHabitController implements Controller<HabitModel> {
  constructor (private readonly createHabit: CreateHabit) {}

  async handle (request: ControllerRequest<CreateHabitParams>) {
    const title = request.body?.title
    const weekDays = request.body?.weekDays
    if (!title) return badRequest(new MissingParamError('title'))
    if (!weekDays) return badRequest(new MissingParamError('weekDays'))

    const habit = await this.createHabit.create(request.body as CreateHabitParams)
    return success<HabitModel>(habit)
  }
}
