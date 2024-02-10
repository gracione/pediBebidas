import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Usuario extends BaseModel {
  public static table = 'usuario'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare telefone: string

  @column()
  declare email: string

  @column()
  declare senha: string

  @column()
  declare data_nascimento: DateTime

  @column()
  declare id_tipo_usuario: number

  @column()
  declare id_endereco: number


}