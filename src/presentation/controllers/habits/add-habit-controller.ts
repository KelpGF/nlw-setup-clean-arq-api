import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { HabitModel, CreateHabit, CreateHabitParams, success, Controller, ControllerRequest, badRequest } from './add-habit-controller-protocols'

export class AddHabitController implements Controller<HabitModel> {
  constructor (private readonly createHabit: CreateHabit) {}

  async handle (request: ControllerRequest<CreateHabitParams>) {
    const requiredFields = ['title', 'weekDays']
    for (const field of requiredFields) {
      if (!request.body?.[field]) return badRequest(new MissingParamError(field))
    }

    const habit = await this.createHabit.create(request.body as CreateHabitParams)
    return success<HabitModel>(habit)
  }
}
