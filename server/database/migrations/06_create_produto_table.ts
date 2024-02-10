import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ProdutoSchema extends BaseSchema {
  protected tableName = 'produto'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.integer('id_imagem').unsigned().references('id').inTable('imagem')
      table.integer('id_estabelecimento').unsigned().references('id').inTable('estabelecimento')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
