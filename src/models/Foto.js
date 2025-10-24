import Sequelize, { Model } from 'sequelize'

export default class Foto extends Model {
  static init (sequelize) {
    super.init(
      {
        originalName: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio'
            }
          },
          field: 'originalName'
        },
        fileName: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio'
            }
          },
          field: 'fileName'
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
