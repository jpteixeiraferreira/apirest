//utilização da biblioteca multer pra fazer o recebimento de arquivos pela requisição
import multer from 'multer'
import multerConfig from '../config/multer'
import Foto from '../models/Foto'

const upload = multer(multerConfig).single('file')

class FotoController {
  async store (req, res) {
    //esse padrão é da biblioteca Multer
    return upload(req, res, async err => {
      if (err) {
        return res.status(400).json({
          errors: [err.code]
        })
      }
      const { aluno_id } = req.body
      try {
        const foto = await Foto.create({
          originalName: req.file.originalname,
          fileName: req.file.filename,
          aluno_id
        })

        return res.json(req.file)
      } catch (e) {
        return res.status(400).json({
          errors: e.errors.map(err => err.message)
        })
      }
    })
  }
}
export default new FotoController()
