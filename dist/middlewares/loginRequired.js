"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
exports. default = (req, res, next) => {
  const {authorization} = req.headers;
  if(!authorization){
    return res.status(401).json({errors: ['Necessário estar autenticado']});
  }
  const [,token] = authorization.split(' ');
  try{
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const {id, email} = dados;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e){
    return res.status(401).json({errors: ['Token expirado ou inválido']});
  }
};
