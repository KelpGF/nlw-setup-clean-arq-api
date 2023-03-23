import { CreateHabitParams, FindHabitByIdRepository, HabitModel, InsertHabitRepository } from '@/data/usecases/habits/db-create-habit-protocols'
import { HabitTableModel } from '../models/habit-table-model'
import { HabitWeekDaysTableModel } from '../models/habit-week-days-table-model'

export class HabitSqlRepository implements InsertHabitRepository, FindHabitByIdRepository {
  async insert (insertHabitParams: CreateHabitParams): Promise<string> {
    const { id: habitId } = await HabitTableModel.create({ title: insertHabitParams.title })
    await Promise.all(insertHabitParams.weekDays.map((weekDay) => HabitWeekDaysTableModel.create({ habit_id: habitId, week_day: weekDay }))) // eslint-disable-line
    return String(habitId)
  }

  async findById (habitId: string): Promise<HabitModel> {
    const habit = await HabitTableModel.findOne({ where: { id: Number(habitId) } }) as any
    const habitWeekDays = await HabitWeekDaysTableModel.findAll({ where: { habit_id: habitId } })

    return {
      id: habit.id,
      title: habit.title,
      weekDays: habitWeekDays.map(day => day.week_day),
      created_at: habit.created_at
    }
  }
}
