'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ImagemSchema extends Schema {
  up() {
    this.create('imagem', (table) => {
      table.increments();
      table.string('url').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('imagem');
  }
}

module.exports = ImagemSchema;