import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PedidosProdutosSchema extends BaseSchema {
  protected tableName = 'pedidos_produtos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('id_produto').unsigned().references('id').inTable('produto')
      table.integer('id_pedido').unsigned().references('id').inTable('pedido')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}