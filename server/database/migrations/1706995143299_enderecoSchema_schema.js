'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EnderecoSchema extends Schema {
  up() {
    this.create('endereco', (table) => {
      table.increments();
      table.string('rua').notNullable();
      table.integer('numero');
      table.string('bairro');
      table.string('complementar');
      table.double('latitude');
      table.double('longitude');
      table.timestamps();
    });
  }

  down() {
    this.drop('endereco');
  }
}

module.exports = EnderecoSchema;