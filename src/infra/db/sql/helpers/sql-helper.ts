import { Sequelize, ModelStatic, Options } from 'sequelize'

export class SqlHelper {
  public dbInstance: Sequelize
  protected modelsAtributes: Record<string, object> = {}

  constructor (
    private readonly dbName: string,
    private readonly host: string,
    private readonly port: number,
    private readonly username: string,
    private readonly pass: string,
    private readonly options: Options
  ) {
    this.connect()
  }

  connect (): void {
    const dbOptions = Object.assign({}, this.options, { host: this.host, port: this.port, logging: false })

    this.dbInstance = new Sequelize(this.dbName, this.username, this.pass, dbOptions)
  }

  defineTable (tableName: string, attributes: Record<string, any>): void {
    this.dbInstance.define(tableName, attributes, { createdAt: false, updatedAt: false })
    this.modelsAtributes[tableName] = attributes
  }

  async getTable (tableName: string): Promise<ModelStatic<any>> {
    await this.dbInstance.authenticate().catch(() => {
      this.connect()
      for (const tableName in this.modelsAtributes) {
        this.defineTable(tableName, this.modelsAtributes[tableName])
      }
    })
    return this.dbInstance.model(tableName)
  }

  async disconnect (): Promise<void> {
    await this.dbInstance.close()
  }
};
