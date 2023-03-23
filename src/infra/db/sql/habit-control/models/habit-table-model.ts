import { Sequelize, Model, DataTypes } from 'sequelize'
import { FnInitModel } from '../../helpers/sequelize-helper'

export class HabitTableModel extends Model {
  public id!: string
  public title!: string
  public readonly created_at!: Date

  // public readonly habitWeekDays?: HabitWeekDaysTableModel[]

  // public static associations: {
  //   habitWeekDays: Association<HabitTableModel, HabitWeekDaysTableModel>
  // }
}

export const initHabitTableModel: FnInitModel = async (sequelize: Sequelize): Promise<void> => {
  HabitTableModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      timestamps: false,
      tableName: 'habits',
      modelName: 'HabitTableModel'
    }
  )

  // HabitTableModel.hasMany(HabitWeekDaysTableModel, {
  //   sourceKey: 'id',
  //   foreignKey: 'habit_id',
  //   as: 'habits'
  // })

  await Promise.resolve()
}
