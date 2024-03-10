import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Estabelecimento extends BaseModel {
  public static table = 'estabelecimento'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare id_usuario: number

  @column()
  declare id_endereco: number
}
