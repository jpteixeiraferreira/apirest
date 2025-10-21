import {Router} from 'express';
import homeController from '../controllers/HomeController';
const router = new Router();

router.get('/', (req, res)=>{
  homeController.index(req, res);
});

export default router;
