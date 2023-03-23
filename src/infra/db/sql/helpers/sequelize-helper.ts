import { Sequelize } from 'sequelize'

export type FnInitModel = (sequelize: Sequelize) => Promise<void>

export const SequelizeNewConnection = (uri: string): Sequelize => new Sequelize(uri, { dialect: 'mysql', logging: false })

export const SequelizeInitDatabase = async (url: string, models: FnInitModel[]): Promise<Sequelize> => {
  const sequelize = SequelizeNewConnection(url)
  await Promise.all(models.map((fn) => fn(sequelize))) // eslint-disable-line
  await sequelize.authenticate()
  return sequelize
}
