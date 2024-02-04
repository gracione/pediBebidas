'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProdutoSchema extends Schema {
  up() {
    this.create('produto', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.integer('id_imagem').unsigned().references('id').inTable('imagem');
      table.integer('id_estabelecimento').unsigned().references('id').inTable('estabelecimento');
      table.timestamps();
    });
  }

  down() {
    this.drop('produto');
  }
}

module.exports = ProdutoSchema;
