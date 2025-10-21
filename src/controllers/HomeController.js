import{ Aluno } from "../database/index.js";
class HomeController {
  async index(req, res){
    const novoAluno = await Aluno.create({
      nome: "Julia",
      sobrenome: 'Ferreira',
      email: 'julia@dev.com',
      idade: 25,
      peso: 56,
      altura: 1.62

    });
    res.json({
      novoAluno,
    });
  }
}
export default new HomeController();
