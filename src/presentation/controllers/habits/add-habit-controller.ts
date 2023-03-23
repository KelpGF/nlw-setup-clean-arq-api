import {
  success,
  badRequest,
  serverError,
  Validation,
  Controller,
  AddHabitControllerDTO,
  CreateHabitUseCase,
  HabitModel,
  CreateHabitDTO,
  CreateHabitModel
} from './add-habit-controller-protocols'

export class AddHabitController implements Controller {
  constructor (
    private readonly createHabit: CreateHabitUseCase, private readonly validateBody: Validation
  ) {}

  async handle (request: AddHabitControllerDTO.Input): AddHabitControllerDTO.Output {
    try {
      const requestBodyDTO = new AddHabitControllerDTO.BodyDTO(request.body as CreateHabitModel)
      const error = this.validateBody.validate(requestBodyDTO)
      if (error) return badRequest(error)
      const createHabitParams = new CreateHabitDTO(requestBodyDTO.title, requestBodyDTO.weekDays)
      const habit = await this.createHabit.execute(createHabitParams)
      return success<HabitModel>(habit.toModel())
    } catch (error) {
      return serverError(error)
    }
  }
}
