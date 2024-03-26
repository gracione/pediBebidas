import { BaseModel, column} from '@adonisjs/lucid/orm'

export default class PedidoProduto extends BaseModel {
  public static table = 'pedidos_produtos'

  @column({ isPrimary: true })
  public id: number

  @column()
  public id_produto: number

  @column()
  public id_pedido: number

  @column()
  public quantidade: number

}
