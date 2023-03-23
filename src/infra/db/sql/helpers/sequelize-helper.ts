import { Sequelize } from 'sequelize'
import { FnGenerateModel } from '../habit-control/models/types'

export const SequelizeNewConnection = (uri: string): Sequelize => new Sequelize(uri, { dialect: 'mysql', logging: false })

export const SequelizeInitDatabase = (url: string, modelsGenerator: FnGenerateModel[]): Sequelize => {
  const db = SequelizeNewConnection(url)
  modelsGenerator.forEach((fn) => { fn(db) })
  return db
}
