import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import Aluno from '../models/Aluno.js';
import User from '../models/User.js';
import Foto from '../models/Foto.js';

const models = [Aluno, User, Foto];
const connection = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig
);
models.forEach(model => model.init(connection));

//Avaliação de curto-circuito pra verificar se um model possui a função associate
models.forEach(model => model.associate && model.associate(connection.models));

export {connection, Aluno, User};
