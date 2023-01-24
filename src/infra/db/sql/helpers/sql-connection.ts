import { Sequelize, ModelStatic, Options } from 'sequelize'

export class SqlHelper {
  public dbInstance: Sequelize
  protected models: Record<string, ModelStatic<any>> = {}

  constructor (
    dbName: string,
    host: string,
    port: number,
    username: string,
    pass: string,
    options: Options
  ) {
    const dbOptions = Object.assign({}, options, { host, port, logging: false })

    this.dbInstance = new Sequelize(dbName, username, pass, dbOptions)
  }

  defineTable (tableName: string, attributes: Record<string, any>): void {
    this.models[tableName] = this.dbInstance.define(tableName, attributes, { createdAt: false, updatedAt: false })
  }

  getTable (tableName: string): ModelStatic<any> {
    return this.models[tableName]
  }

  async disconnect (): Promise<void> {
    await this.dbInstance.close()
  }
};
