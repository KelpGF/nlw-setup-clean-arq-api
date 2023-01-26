import { FindHabitByIdRepository, HabitModel } from '@/data/usecases/habits/db-create-habit-protocols'
import { SqlHelper } from '@/infra/db/sql/helpers/sql-connection'

export class HabitSqlRepository implements FindHabitByIdRepository {
  constructor (private readonly database: SqlHelper) {}

  async findById (habitId: string): Promise<HabitModel> {
    const habitTable = this.database.getTable('habits')
    const habit = await habitTable.findOne({ where: { id: habitId } })
    return habit
  }
}