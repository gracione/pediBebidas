import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ImagemProdutoSchema extends BaseSchema {
  protected tableName = 'imagem_produto'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.integer('id_imagem').unsigned().references('id').inTable('imagem')
      table.decimal('valor')
      table.integer('id_produto').unsigned().references('id').inTable('produto')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

