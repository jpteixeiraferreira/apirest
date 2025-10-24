import {Router} from 'express';
import alunoController from '../controllers/AlunoController';
const router = new Router();

router.get('/', (req, res)=>{
  alunoController.index(req, res);
});
router.post('/', (req, res)=>{
  alunoController.store(req, res);
});
router.get('/:id', (req, res)=>{
  alunoController.show(req, res);
});
router.put('/:id', (req, res)=>{
  alunoController.update(req, res);
});
router.delete('/:id', (req, res)=>{
  alunoController.delete(req, res);
});


export default router;
