import { HabitModel, CreateHabit, CreateHabitParams, success, Controller, badRequest, serverError, Validation, AddHabitControllerDTO, CreateHabitModel } from './add-habit-controller-protocols'

export class AddHabitController implements Controller {
  constructor (
    private readonly createHabit: CreateHabit, private readonly validateBody: Validation
  ) {}

  async handle (request: AddHabitControllerDTO.Input): AddHabitControllerDTO.Output {
    try {
      const requestBodyDTO = new AddHabitControllerDTO.BodyDTO(request.body as CreateHabitModel)
      const error = this.validateBody.validate(requestBodyDTO)
      if (error) return badRequest(error)

      const createHabitParams: CreateHabitParams = {
        title: requestBodyDTO.title,
        weekDays: requestBodyDTO.weekDays
      }
      const habit = await this.createHabit.create(createHabitParams)
      return success<HabitModel>(habit)
    } catch (error) {
      return serverError(error)
    }
  }
}
