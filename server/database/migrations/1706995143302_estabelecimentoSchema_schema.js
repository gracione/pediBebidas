'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EstabelecimentoSchema extends Schema {
  up() {
    this.create('estabelecimento', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.integer('id_usuario').unsigned().references('id').inTable('usuario');
      table.integer('id_endereco').unsigned().references('id').inTable('endereco');
      table.timestamps();
    });
  }

  down() {
    this.drop('estabelecimento');
  }
}
module.exports = EstabelecimentoSchema;
