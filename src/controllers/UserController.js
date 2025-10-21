import { User } from '../database/index.js'
class UserController {
  async store (req, res) {
    try {
      const novoUsuario = await User.create(req.body);
      res.json({
        novoUsuario
      })
    } catch (e) {
      res.status(400).json({
       error: e.errors.map(err => err.message)
      })
    }
  }
}
export default new UserController()
