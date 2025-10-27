import Sequelize, { Model } from 'sequelize'
import appConfig from '../config/appConfig'
export default class Foto extends Model {
  static init (sequelize) {
    super.init(
      {
        originalName: {
          type: Sequelize.STRING,
          field: 'originalName',
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio'
            }
          },
        },
        fileName: {
          type: Sequelize.STRING,
          field: 'fileName',
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio'
            }
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get(){
            return `${appConfig.url}/images/${this.getDataValue('fileName')}`
          }
        }
      },
      {
        sequelize,
        tableName: 'fotos'
      }
    )
    return this
  }

  static associate(models){
    this.belongsTo(models.Aluno, {foreignKey: 'aluno_id'});
  }
}
