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

  public static async prepare(data: []) {
    return data;    
  }

  public static async getProdutosByIdEstabelecimento(idEstabelecimento: number) {
    const data = await Produto.query().where('id_estabelecimento', idEstabelecimento)
    return data
  }
}
