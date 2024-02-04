'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ImagemProdutoSchema extends Schema {
  up() {
    this.create('imagem_produto', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.integer('id_imagem').unsigned().references('id').inTable('imagem');
      table.decimal('valor');
      table.integer('id_produto').unsigned().references('id').inTable('produto');
      table.timestamps();
    });
  }

  down() {
    this.drop('imagem_produto');
  }
}

module.exports = ImagemProdutoSchema;
