import Sequelize from 'sequelize';
import databaseConfig from '../config/database.js';
import Aluno from '../models/Aluno.js';
import User from '../models/User.js';

const models = [Aluno, User];
const connection = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  databaseConfig
);
models.forEach(model => model.init(connection));

export {connection, Aluno, User};
