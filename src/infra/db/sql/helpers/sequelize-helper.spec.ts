import env from '@/main/config/env'
import { Sequelize } from 'sequelize'
import { SequelizeNewConnection } from './sequelize-helper'

describe('Sequelize Helper', () => {
  test('Should SequelizeNewConnection return a new Sequelize', () => {
    const sut = SequelizeNewConnection
    const result = sut(env.HABIT_CONTROL_TEST_DB_CONNECTION_STRING)
    expect(result).toBeInstanceOf(Sequelize)
  })
})
