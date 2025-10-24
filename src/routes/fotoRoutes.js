import {Router} from 'express';
import fotoController from '../controllers/FotoController';

const router = new Router();

router.post('/', (req, res)=>{
  fotoController.store(req, res);
});

export default router;
