import { BaseModel, column } from '@adonisjs/lucid/orm'
import ModelInterface from '#contracts/ModelInterface';

export default class Endereco extends BaseModel implements ModelInterface {
  public static table = 'endereco'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare rua: string

  @column()
  declare numero: number

  @column()
  declare bairro: string

  @column()
  declare complementar: string

  @column()
  declare latitude: number

  @column()
  declare longitude: number

  public prepare(data: []): [] {
      return data;
  }
}
