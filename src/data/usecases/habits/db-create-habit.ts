import { InsertHabitRepository } from '@/data/protocols/db/habit/insert-habit-repository'
import { Habit } from '@/domain/models/habits'
import { CreateHabit, CreateHabitParams } from '@/domain/usecases/habits/create-habit'

export class DbCreateHabit implements CreateHabit {
  constructor (
    private readonly insertHabitRepository: InsertHabitRepository
  ) {}

  async create (createHabitParams: CreateHabitParams): Promise<Habit> {
    await this.insertHabitRepository.insert(createHabitParams)

    return null as unknown as Habit
  }
}
