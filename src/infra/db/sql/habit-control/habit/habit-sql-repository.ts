import { CreateHabitParams, FindHabitByIdRepository, HabitModel, InsertHabitRepository } from '@/data/usecases/habits/db-create-habit-protocols'
import { HabitTableModel } from '../models/habit-table-model'
import { HabitWeekDaysTableModel } from '../models/habit-week-days-table-model'

export class HabitSqlRepository implements InsertHabitRepository, FindHabitByIdRepository {
  async insert (insertHabitParams: CreateHabitParams): Promise<string> {
    const { id: habitId } = await HabitTableModel.create({ title: insertHabitParams.title })
    await HabitWeekDaysTableModel.bulkCreate(insertHabitParams.weekDays.map((weekDay) => ({ habit_id: habitId, week_day: weekDay })))
    return String(habitId)
  }

  async findById (habitId: string): Promise<HabitModel> {
    const [habit, habitWeekDays] = await Promise.all([
      await HabitTableModel.findByPk(Number(habitId)) as HabitTableModel,
      await HabitWeekDaysTableModel.findAll({ where: { habit_id: habitId } })
    ])

    return {
      id: habit.id,
      title: habit.title,
      weekDays: habitWeekDays.map(day => day.week_day),
      created_at: habit.created_at
    }
  }
}
