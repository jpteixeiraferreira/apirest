import {Router} from 'express';
import userController from '../controllers/UserController';
const router = new Router();

router.post('/', (req, res)=>{
  userController.store(req, res);
});

export default router;
