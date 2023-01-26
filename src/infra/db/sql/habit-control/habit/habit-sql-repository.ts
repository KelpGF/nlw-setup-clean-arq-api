import { CreateHabitParams, FindHabitByIdRepository, HabitModel, InsertHabitRepository } from '@/data/usecases/habits/db-create-habit-protocols'
import { SqlHelper } from '@/infra/db/sql/helpers/sql-helper'

export class HabitSqlRepository implements InsertHabitRepository, FindHabitByIdRepository {
  constructor (private readonly database: SqlHelper) {}

  async insert (insertHabitParams: CreateHabitParams): Promise<string> {
    const habitTable = await this.database.getTable('habits')
    const habitWeekDaysTable = await this.database.getTable('habit_week_days')
    const { id: habitId } = await habitTable.create({ title: insertHabitParams.title })
    await Promise.all(insertHabitParams.weekDays.map((weekDay) => habitWeekDaysTable.create({ habit_id: habitId, week_day: weekDay }))) // eslint-disable-line
    return String(habitId)
  }

  async findById (habitId: string): Promise<HabitModel> {
    const habitTable = await this.database.getTable('habits')
    const habit = await habitTable.findOne({ where: { id: Number(habitId) } })
    const habitWeekDaysTable = await this.database.getTable('habit_week_days')
    const habitWeekDays = await habitWeekDaysTable.findAll({ where: { habit_id: habitId } })
    return Object.assign(habit, { weekDays: habitWeekDays.map((weekDays) => weekDays.week_day) })
  }
}
