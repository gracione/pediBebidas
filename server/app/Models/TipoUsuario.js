'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class TipoUsuario extends Model {
  static get table() {
    return 'tipo_usuario';
  }

  static get fillable() {
    return ['nome'];
  }
}

module.exports = TipoUsuario;
