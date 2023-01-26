import { SqlHelper } from './sql-helper'

let sqlDB: SqlHelper

describe('SQL Helper', () => {
  beforeAll(() => {
    sqlDB = new SqlHelper(
      'test',
      'localhost',
      3306,
      'root',
      'password',
      { dialect: 'mysql' }
    )
    sqlDB.defineTable('test', {})
  })

  afterAll(async () => {
    await sqlDB.disconnect()
  })

  test('Should reconnect if sql disconnect', async () => {
    let connected: boolean | null = null
    const setConnected = (status: boolean): boolean => (connected = status)

    await sqlDB.dbInstance.authenticate().then(() => setConnected(true)).catch(() => setConnected(false))
    expect(connected).toBe(true)

    await sqlDB.disconnect()
    await sqlDB.getTable('test')

    await sqlDB.dbInstance.authenticate().then(() => setConnected(true)).catch(() => setConnected(false))
    expect(connected).toBe(true)
  })
})
