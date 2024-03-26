import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Produto extends BaseModel {
  public static table = 'produto'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare valor: number

  @column()
  declare id_estabelecimento: number

  @column()
  declare id_imagem: number

}
