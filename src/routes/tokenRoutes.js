import {Router} from 'express';
const router = new Router();
import tokenController from '../controllers/TokenController';

router.post('/', (req, res)=>{
  tokenController.store(req, res);
});

export default router;
