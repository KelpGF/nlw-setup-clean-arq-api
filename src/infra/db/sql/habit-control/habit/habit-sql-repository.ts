import { CreateHabitDTO, FindHabitByIdRepository, HabitEntity, InsertHabitRepository, HabitWeekDayEntity } from '@/data/usecases/habits/db-create-habit-protocols'
import { HabitTableModel } from '../models/habit-table-model'
import { HabitWeekDaysTableModel } from '../models/habit-week-days-table-model'

export class HabitSqlRepository implements InsertHabitRepository, FindHabitByIdRepository {
  async insert (insertHabitParams: CreateHabitDTO): Promise<string> {
    const { id: habitId } = await HabitTableModel.create({ title: insertHabitParams.title })
    await HabitWeekDaysTableModel.bulkCreate(insertHabitParams.weekDays.map((weekDay) => ({ habit_id: habitId, week_day: weekDay })))
    return String(habitId)
  }

  async findById (habitId: string): Promise<HabitEntity> {
    const [habit, habitWeekDays] = await Promise.all([
      await HabitTableModel.findByPk(Number(habitId)) as HabitTableModel,
      await HabitWeekDaysTableModel.findAll({ where: { habit_id: habitId } })
    ])

    return new HabitEntity(
      habit.id,
      habit.title,
      habitWeekDays.map(day => new HabitWeekDayEntity(day.id, day.habit_id, day.week_day)),
      habit.created_at
    )
  }
}
