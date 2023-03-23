import env from '@/main/config/env'
import { Sequelize } from 'sequelize'
import { SequelizeInitDatabase, SequelizeNewConnection } from './sequelize-helper'

describe('Sequelize Helper', () => {
  test('Should SequelizeNewConnection return a new Sequelize', () => {
    const sut = SequelizeNewConnection
    const result = sut(env.HABIT_CONTROL_TEST_DB_CONNECTION_STRING)
    expect(result).toBeInstanceOf(Sequelize)
  })

  test('Should SequelizeInitDatabase return a new Sequelize', () => {
    const sut = SequelizeInitDatabase
    const result = sut(env.HABIT_CONTROL_TEST_DB_CONNECTION_STRING, [])
    expect(result).toBeInstanceOf(Sequelize)
  })
})
