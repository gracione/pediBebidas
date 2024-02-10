import { BaseSchema } from '@adonisjs/lucid/schema'

export default class EnderecoSchema extends BaseSchema {
  protected tableName = 'endereco'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('rua').notNullable()
      table.integer('numero')
      table.string('bairro')
      table.string('complementar')
      table.double('latitude')
      table.double('longitude')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
