import { Model, DataTypes, Sequelize } from 'sequelize'
import { FnInitModel } from '../../helpers/sequelize-helper'

export class HabitWeekDaysTableModel extends Model {
  public id!: string
  public habit_id!: string
  public week_day!: number
}

export const initHabitWeekDaysTableModel: FnInitModel = async (sequelize: Sequelize): Promise<void> => {
  HabitWeekDaysTableModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      habit_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'habits',
          key: 'id'
        }
      },
      week_day: {
        type: DataTypes.NUMBER,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'habit_week_days',
      modelName: 'HabitWeekDaysTableModel'
    }
  )
  await Promise.resolve()
}
