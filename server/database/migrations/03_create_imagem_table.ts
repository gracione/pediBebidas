import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ImagemSchema extends BaseSchema {
    protected tableName = 'imagem'
  
    public async up() {
      this.schema.createTable(this.tableName, (table) => {
        table.increments('id').primary()
        table.string('url').notNullable()
        table.timestamps(true, true)
      })
    }
  
    public async down() {
      this.schema.dropTable(this.tableName)
    }
  }
  