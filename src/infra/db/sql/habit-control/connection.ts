import env from '@/main/config/env'
import { SequelizeInitDatabase } from '../helpers/sequelize-helper'
import { HabitTableModelFactory, HabitWeekDaysTableModelFactory } from './models'
import { FnGenerateModel } from './models/types'

const modelsGenerator: FnGenerateModel[] = [
  HabitTableModelFactory,
  HabitWeekDaysTableModelFactory
]

export const dbSqlHabitConnection = SequelizeInitDatabase(env.HABIT_CONTROL_DB_CONNECTION_STRING, modelsGenerator)
