"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }//utilização da biblioteca multer pra fazer o recebimento de arquivos pela requisição
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
var _path = require('path');
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

const upload = _multer2.default.call(void 0, _multer4.default).single('file')

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
        const existeFoto = await _Foto2.default.findOne({ where: { aluno_id } })
        if (existeFoto) {
          const caminho = _path.resolve.call(void 0, 
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
            await _fs2.default.promises.unlink(caminho)
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
        const foto = await _Foto2.default.create({
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
exports. default = new FotoController()
