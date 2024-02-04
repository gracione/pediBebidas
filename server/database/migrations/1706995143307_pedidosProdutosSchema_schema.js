'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PedidosProdutosSchema extends Schema {
  up() {
    this.create('pedidos_produtos', (table) => {
      table.increments();
      table.integer('id_produto').unsigned().references('id').inTable('produto');
      table.integer('id_pedido').unsigned().references('id').inTable('pedido');
      table.timestamps();
    });
  }

  down() {
    this.drop('pedidos_produtos');
  }
}


module.exports = PedidosProdutosSchema;
