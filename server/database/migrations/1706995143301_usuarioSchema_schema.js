'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UsuarioSchema extends Schema {
  up() {
    this.create('usuario', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.string('telefone');
      table.string('email').notNullable();
      table.string('password', 60).notNullable();
      table.date('data_nascimento');
      table.integer('id_tipo_usuario').unsigned().references('id').inTable('tipo_usuario');
      table.integer('id_endereco').unsigned().references('id').inTable('endereco');
      table.integer('id_imagem').unsigned().references('id').inTable('imagem');
      table.timestamps();
    });
  }

  down() {
    this.drop('usuario');
  }
}

module.exports = UsuarioSchema;
