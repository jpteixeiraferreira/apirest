import {Router} from 'express';
import userController from '../controllers/UserController';
const router = new Router();

router.post('/', (req, res)=>{
  userController.store(req, res);
});
router.get('/', (req, res)=>{
  userController.index(req, res);
});
router.get('/:id', (req, res)=>{
  userController.show(req, res);
});
router.put('/:id', (req, res)=>{
  userController.update(req, res);
});
router.delete('/:id', (req, res)=>{
  userController.delete(req, res);
});
export default router;
