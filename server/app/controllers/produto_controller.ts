import { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produto'
import BaseController from './bases_controller.js'

export default class ProdutoController extends BaseController {
  constructor() {
    super(Produto)
  }

  async getProdutosByIdEstabelecimentoAction({ params, response }: HttpContext) {
    const data = await Produto.getProdutosByIdEstabelecimento(params.id_estabelecimento)

    if (!data) {
      return response.notFound({ message: `${Produto.name} not found` })
    }

    return response.ok(data)
  }
}
