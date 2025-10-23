import Aluno from '../models/Aluno';

class AlunoController {
  async index (req, res) {
    try {
      const alunos = await Aluno.findAll();
      if(!alunos){
        return res.status(400).json({
          error: 'Não existem alunos cadastrados'
        })
      }

      return res.json(alunos);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
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
      const aluno = await Aluno.create(req.body)
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

      const aluno = await Aluno.findByPk(id)
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

      const aluno = await Aluno.findByPk(id)
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

      const aluno = await Aluno.findByPk(id);
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
    const aluno = await Aluno.findOne({
      where: { email: novoEmail }
    })

    return aluno ? true : false
  }
}
export default new AlunoController()
