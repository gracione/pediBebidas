import { BaseSchema } from '@adonisjs/lucid/schema'

export default class TipoUsuarioSchema extends BaseSchema {
  protected tableName = 'tipo_usuario'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
