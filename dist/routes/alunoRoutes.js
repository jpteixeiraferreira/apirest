"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _AlunoController = require('../controllers/AlunoController'); var _AlunoController2 = _interopRequireDefault(_AlunoController);
const router = new (0, _express.Router)();

router.get('/', (req, res)=>{
  _AlunoController2.default.index(req, res);
});
router.post('/', (req, res)=>{
  _AlunoController2.default.store(req, res);
});
router.get('/:id', (req, res)=>{
  _AlunoController2.default.show(req, res);
});
router.put('/:id', (req, res)=>{
  _AlunoController2.default.update(req, res);
});
router.delete('/:id', (req, res)=>{
  _AlunoController2.default.delete(req, res);
});


exports. default = router;
