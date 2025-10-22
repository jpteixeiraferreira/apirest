import { Router } from 'express'
import userController from '../controllers/UserController'
import loginRequired from '../middlewares/loginRequired'
const router = new Router()

//loginRequired é o middleware de autenticação com token jwt
router.get('/', loginRequired, (req, res) => {
  userController.index(req, res)
})
router.get('/:id', (req, res) => {
  userController.show(req, res)
})

router.post('/', (req, res) => {
  userController.store(req, res)
})
router.put('/', loginRequired, (req, res) => {
  userController.update(req, res)
})
router.delete('/', loginRequired, (req, res) => {
  userController.delete(req, res)
})
export default router
