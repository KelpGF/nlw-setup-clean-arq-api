import { Sequelize } from 'sequelize'

export const SequelizeNewConnection = (uri: string): Sequelize => new Sequelize(uri, { dialect: 'mysql', logging: false })
