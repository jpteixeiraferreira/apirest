import dotenv from 'dotenv';
import {resolve} from 'path';
import cors from 'cors';
dotenv.config();

import './database/index.js';

import express from 'express';
import appConfig from './config/appConfig.js';
import homeRoutes from './routes/homeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js';
import alunoRoutes from './routes/alunoRoutes.js';
import fotoRoutes from './routes/fotoRoutes.js';


class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(cors());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(express.json());
    this.app.use('/images', express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes(){
    this.app.use('/', homeRoutes);
    this.app.use('/alunos', alunoRoutes);
    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/fotos', fotoRoutes);
  }
}

export default new App().app;
