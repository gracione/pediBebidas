'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ImagemEstabelecimentoSchema extends Schema {
  up() {
    this.create('imagem_estabelecimento', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.integer('id_imagem').unsigned().references('id').inTable('imagem');
      table.integer('id_estabelecimento').unsigned().references('id').inTable('estabelecimento');
      table.timestamps();
    });
  }

  down() {
    this.drop('imagem_estabelecimento');
  }
}

module.exports = ImagemEstabelecimentoSchema;
