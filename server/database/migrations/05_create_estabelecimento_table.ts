import { BaseSchema } from '@adonisjs/lucid/schema'

export default class EstabelecimentoSchema extends BaseSchema {
  protected tableName = 'estabelecimento'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.integer('id_usuario').unsigned().references('id').inTable('usuario')
      table.integer('id_endereco').unsigned().references('id').inTable('endereco')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
