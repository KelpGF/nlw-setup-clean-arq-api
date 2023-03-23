import { dbSqlHabitConnection } from './connection'

describe('dbSqlHabitConnection Connection', () => {
  test('Should database has been initialized', async () => {
    const sut = dbSqlHabitConnection
    const result = await sut.authenticate()  // eslint-disable-line
    expect(result).toBeUndefined()
  })
})
