import { Sequelize } from 'sequelize'
import { HabitSqlRepository } from './habit-sql-repository'
import { mockCreateHabitDTO } from '@/domain/tests/mock-habit'
import { HabitTableModel, HabitWeekDaysTableModel, initHabitTableModel, initHabitWeekDaysTableModel } from '../models'
import { SequelizeInitDatabase } from '../../helpers/sequelize-helper'
import env from '@/main/config/env'
import { HabitEntity } from '@/domain/entities/habit-entity'

let sqlDB: Sequelize

const makeSut = (): HabitSqlRepository => new HabitSqlRepository()

describe('Habit Sql Repository', () => {
  beforeAll(async () => {
    const modelsGenerator = [initHabitTableModel, initHabitWeekDaysTableModel]
    sqlDB = await SequelizeInitDatabase(env.HABIT_CONTROL_TEST_DB_CONNECTION_STRING, modelsGenerator)
  })

  beforeEach(async () => {
    await HabitTableModel.destroy({ where: {} })
    await HabitWeekDaysTableModel.destroy({ where: {} })
  })

  afterAll(async () => {
    await sqlDB.close()
  })

  test('Should return a habit entity on findById success', async () => {
    const sut = makeSut()
    const createHabitDTO = mockCreateHabitDTO()
    const { id: habitId } = await HabitTableModel.create({ title: createHabitDTO.title })
    await HabitWeekDaysTableModel.bulkCreate(createHabitDTO.weekDays.map((weekDay) => ({ habit_id: habitId, week_day: weekDay })))
    const habit = await sut.findById(habitId)
    expect(habit).toBeTruthy()
    expect(habit).toBeInstanceOf(HabitEntity)
    expect(habit.id).toBeTruthy()
    expect(habit.title).toBe(createHabitDTO.title)
    expect(habit.weekDays.map(day => day.weekDay)).toEqual(createHabitDTO.weekDays)
  })

  test('Should create a habit and your week days on insert success', async () => {
    const sut = makeSut()
    const createHabitDTO = mockCreateHabitDTO()
    const habitId = await sut.insert(createHabitDTO)
    const [habit, habitWeekDays] = await Promise.all([
      await HabitTableModel.findByPk(habitId) as HabitTableModel,
      await HabitWeekDaysTableModel.findAll({ where: { habit_id: Number(habitId) } })
    ])
    expect(habit).toBeTruthy()
    expect(habit.id).toBeTruthy()
    expect(habit.id).toBe(Number(habitId))
    expect(habit.title).toBe(createHabitDTO.title)
    expect(habitWeekDays.map((weekDayData) => ({ habit_id: weekDayData.habit_id, week_day: weekDayData.week_day })))
      .toEqual(createHabitDTO.weekDays.map((weekDay) => ({ habit_id: Number(habitId), week_day: weekDay })))
  })
})
