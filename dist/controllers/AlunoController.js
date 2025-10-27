"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
class AlunoController {
  async index (req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura'
        ],
        order: [['id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['fileName', 'url'],
        }
      })
      if (!alunos) {
        return res.status(400).json({
          error: 'Não existem alunos cadastrados'
        })
      }

      return res.json(alunos)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors ? e.errors.map(err => err.message) : [e.message]
      })
    }
  }

  async store (req, res) {
    if (await this.emailExiste(req.body.email)) {
      return res.status(401).json({
        errors: 'E-mail já existe'
      })
    }
    try {
      const aluno = await _Aluno2.default.create(req.body)
      if (!req.body) {
        return res.status(400).json({
          errors: ['Necessário informar os dados do aluno para o cadastro.']
        })
      }
      return res.json(aluno)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
  async show (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({
          errors: ['Está faltando o ID do aluno.']
        })
      }

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura'
        ],
        order: [['id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['fileName', 'url']
        }
      })
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.']
        })
      }
      return res.json(aluno)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
  async update (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({
          errors: ['Está faltando o ID do aluno.']
        })
      }

      const aluno = await _Aluno2.default.findByPk(id)
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.']
        })
      }
      const alunoAtualizado = await aluno.update(req.body)
      return res.json(alunoAtualizado)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }
  async delete (req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({
          errors: ['Está faltando o ID do aluno.']
        })
      }

      const aluno = await _Aluno2.default.findByPk(id)
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe.']
        })
      }
      await aluno.destroy()
      return res.json({
        apagado: true
      })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      })
    }
  }

  async emailExiste (novoEmail) {
    const aluno = await _Aluno2.default.findOne({
      where: { email: novoEmail }
    })

    return aluno ? true : false
  }
}
exports. default = new AlunoController()
