"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
const router = new (0, _express.Router)()

//loginRequired é o middleware de autenticação com token jwt
router.get('/', _loginRequired2.default, (req, res) => {
  _UserController2.default.index(req, res)
})
router.get('/:id', (req, res) => {
  _UserController2.default.show(req, res)
})

router.post('/', (req, res) => {
  _UserController2.default.store(req, res)
})
router.put('/', _loginRequired2.default, (req, res) => {
  _UserController2.default.update(req, res)
})
router.delete('/', _loginRequired2.default, (req, res) => {
  _UserController2.default.delete(req, res)
})
exports. default = router
