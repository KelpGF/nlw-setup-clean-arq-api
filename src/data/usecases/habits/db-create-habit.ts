import { FindHabitByIdRepository, InsertHabitRepository, CreateHabit, CreateHabitParams, HabitModel } from './db-create-habit-protocols'

export class DbCreateHabit implements CreateHabit {
  constructor (
    private readonly insertHabitRepository: InsertHabitRepository,
    private readonly findHabitByIdRepository: FindHabitByIdRepository
  ) {}

  async create (createHabitParams: CreateHabitParams): Promise<HabitModel> {
    const habitId = await this.insertHabitRepository.insert(createHabitParams)
    await this.findHabitByIdRepository.findById(habitId)

    return null as unknown as HabitModel
  }
}
