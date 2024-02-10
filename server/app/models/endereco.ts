import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Endereco extends BaseModel {
  public static table = 'endereco';

  @column({ isPrimary: true })
  declare id: number

}