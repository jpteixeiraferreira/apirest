"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);
 class Foto extends _sequelize.Model {
  static init (sequelize) {
    super.init(
      {
        originalName: {
          type: _sequelize2.default.STRING,
          field: 'originalName',
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio'
            }
          },
        },
        fileName: {
          type: _sequelize2.default.STRING,
          field: 'fileName',
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio'
            }
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get(){
            return `${_appConfig2.default.url}/images/${this.getDataValue('fileName')}`
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
} exports.default = Foto;
