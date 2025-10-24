//utilização da biblioteca multer pra fazer o recebimento de arquivos pela requisição
import multer from 'multer';
import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('file');

class FotoController {
  async store(req, res){

    //esse padrão é da biblioteca Multer
    return upload(req, res, (err) => {
      if(err){
        return res.status(400).json({
          errors: [err.code],
        })
      }

      return res.json(req.file);
    })
  }
}
export default new FotoController();
