//utilização da biblioteca multer pra fazer o recebimento de arquivos pela requisição
import multer from 'multer'
import multerConfig from '../config/multer'
import Foto from '../models/Foto'
import { resolve } from 'path'
import fs from 'fs'

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
      try {
        const { aluno_id } = req.body
        //verifica se já existe uma foto salva no banco pra esse aluno, e atualiza o nome da foto se houver
        const existeFoto = await Foto.findOne({ where: { aluno_id } })
        if (existeFoto) {
          const caminho = resolve(
            __dirname,
            '..',
            '..',
            'uploads',
            'images',
            existeFoto.fileName
          )
          console.log(caminho);
          if (!caminho) {
            return res.status(400).json({
              errors: 'Não foi possível encontrar a foto anterior.'
            })
          }
          try {
            await fs.promises.unlink(caminho)
          } catch (e) {
            console.error(e);
          }

          const fotoAtualizada = await existeFoto.update({
            originalName: req.file.originalname,
            fileName: req.file.filename
          })

          return res.json(fotoAtualizada)
        }

        //caso não exista um registro de foto pra esse aluno, será criado um novo registro normalmente
        const foto = await Foto.create({
          originalName: req.file.originalname,
          fileName: req.file.filename,
          aluno_id
        })

        return res.json(foto)
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não existe']
        })
      }
    })
  }
}
export default new FotoController()
