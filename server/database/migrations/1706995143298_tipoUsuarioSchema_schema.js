'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TipoUsuarioSchema extends Schema {
  up() {
    this.create('tipo_usuario', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('tipo_usuario');
  }
}


module.exports = TipoUsuarioSchema;