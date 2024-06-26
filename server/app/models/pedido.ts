import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Pedido extends BaseModel {
  public static table = 'pedido'

  @column({ isPrimary: true })
  public id: number

  @column()
  public tp_situacao: string

  @column()
  public id_usuario: number

  @column()
  public id_endereco: number

  @column()
  public valor: number

  public static async getUserOrdersByIdUser(idUsuario: number) {
    const data = await Pedido.query().where('id_usuario', idUsuario)
    return data;
  }
}
