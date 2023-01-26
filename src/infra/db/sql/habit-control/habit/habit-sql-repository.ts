import { CreateHabitParams, FindHabitByIdRepository, HabitModel, InsertHabitRepository } from '@/data/usecases/habits/db-create-habit-protocols'
import { SqlHelper } from '@/infra/db/sql/helpers/sql-helper'

export class HabitSqlRepository implements InsertHabitRepository, FindHabitByIdRepository {
  constructor (private readonly database: SqlHelper) {}

  async insert (insertHabitParams: CreateHabitParams): Promise<string> {
    const habitTable = await this.database.getTable('habits')
    const result = await habitTable.create({ title: insertHabitParams.title })
    return String(result.id)
  }

  async findById (habitId: string): Promise<HabitModel> {
    const habitTable = await this.database.getTable('habits')
    const habit = await habitTable.findOne({ where: { id: habitId } })
    return habit
  }
}
