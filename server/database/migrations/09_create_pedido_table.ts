import { BaseSchema } from '@adonisjs/lucid/schema'

export default class PedidoSchema extends BaseSchema {
  protected tableName = 'pedido'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('tp_situacao')
      table.integer('id_usuario').unsigned().references('id').inTable('usuario')
      table.integer('id_endereco').unsigned().references('id').inTable('endereco')
      table.decimal('valor')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
