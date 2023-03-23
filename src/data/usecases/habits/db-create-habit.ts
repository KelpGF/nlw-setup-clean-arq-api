import { FindHabitByIdRepository, InsertHabitRepository, HabitEntity, CreateHabitUseCase, CreateHabitDTO } from './db-create-habit-protocols'

export class DbCreateHabit implements CreateHabitUseCase {
  constructor (
    private readonly insertHabitRepository: InsertHabitRepository,
    private readonly findHabitByIdRepository: FindHabitByIdRepository
  ) {}

  async execute (createHabitParams: CreateHabitDTO): Promise<HabitEntity> {
    const habitId = await this.insertHabitRepository.insert(createHabitParams)
    const habit = await this.findHabitByIdRepository.findById(habitId)
    return habit
  }
}
