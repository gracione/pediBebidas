import { BaseSchema } from '@adonisjs/lucid/schema'

export default class UsuarioSchema extends BaseSchema {
  protected tableName = 'usuario'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('nome').notNullable()
      table.string('telefone')
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.date('data_nascimento')
      table.integer('id_tipo_usuario').unsigned().references('id').inTable('tipo_usuario')
      table.integer('id_endereco').unsigned().references('id').inTable('endereco')
      table.integer('id_imagem').unsigned().references('id').inTable('imagem')
      table.timestamps(true, true)
    })
  }
}
