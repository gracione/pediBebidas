'use strict';

const BaseController = use('App/Controllers/Http/BaseController');
const Endereco = use('App/Models/Endereco');

class EnderecoController extends BaseController {
  constructor() {
    super(Endereco);
  }
}

module.exports = EnderecoController;
