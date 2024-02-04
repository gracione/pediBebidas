'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PedidoSchema extends Schema {
  up() {
    this.create('pedido', (table) => {
      table.increments();
      table.string('tp_situacao');
      table.integer('id_usuario').unsigned().references('id').inTable('usuario');
      table.integer('id_endereco').unsigned().references('id').inTable('endereco');
      table.decimal('valor');
      table.timestamps();
    });
  }

  down() {
    this.drop('pedido');
  }
}

module.exports = PedidoSchema;
