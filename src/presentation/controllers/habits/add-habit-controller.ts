import { HabitModel, CreateHabit, CreateHabitParams, success, Controller, badRequest, serverError, Validation, AddHabitControllerDto } from './add-habit-controller-protocols'

export class AddHabitController implements Controller {
  constructor (
    private readonly createHabit: CreateHabit, private readonly validateBody: Validation
  ) {}

  async handle (request: AddHabitControllerDto.Input): AddHabitControllerDto.Output {
    try {
      const requestBody = request.body as CreateHabitParams
      const error = this.validateBody.validate(requestBody)
      if (error) return badRequest(error)

      const createHabitParams: CreateHabitParams = {
        title: requestBody.title,
        weekDays: requestBody.weekDays
      }

      const habit = await this.createHabit.create(createHabitParams)
      return success<HabitModel>(habit)
    } catch (error) {
      return serverError(error)
    }
  }
}
