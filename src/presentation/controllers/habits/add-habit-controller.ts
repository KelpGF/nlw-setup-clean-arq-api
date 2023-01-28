import { HabitModel, CreateHabit, CreateHabitParams, success, Controller, badRequest, serverError, Validation } from './add-habit-controller-protocols'

export class AddHabitController implements Controller<HabitModel> {
  constructor (
    private readonly createHabit: CreateHabit, private readonly validateBody: Validation
  ) {}

  async handle (request: Controller.Request<CreateHabitParams>) {
    try {
      const error = this.validateBody.validate(request.body)
      if (error) return badRequest(error)

      const habit = await this.createHabit.create(request.body as CreateHabitParams)
      return success<HabitModel>(habit)
    } catch (error) {
      return serverError(error)
    }
  }
}
